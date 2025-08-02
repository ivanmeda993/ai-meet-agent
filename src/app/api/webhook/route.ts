import {
  type CallEndedEvent,
  type CallRecordingReadyEvent,
  type CallSessionParticipantLeftEvent,
  type CallSessionStartedEvent,
  type CallTranscriptionReadyEvent,
} from '@stream-io/node-sdk';
import { and, eq, not } from 'drizzle-orm';
import { type NextRequest, NextResponse } from 'next/server';

import { db } from '@/db';
import { agents, meetings } from '@/db/schema';
import { generateAvatarUri } from '@/lib/avatar';
import { ENV } from '@/lib/env';
import { streamVideo } from '@/lib/stream-video';

function verifySignatureWithSDK(body: string, signature: string): boolean {
  return streamVideo.verifyWebhook(body, signature);
}

export async function POST(req: NextRequest) {
  const signature = req.headers.get('x-signature');
  const apiKey = req.headers.get('x-api-key');

  if (!signature || !apiKey) {
    return NextResponse.json(
      { error: 'Missing signature or API key' },
      { status: 400 },
    );
  }

  const body = await req.text();

  if (!verifySignatureWithSDK(body, signature)) {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  let payload: unknown;
  try {
    payload = JSON.parse(body) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const eventType = (payload as Record<string, unknown>)?.type;

  console.log(`Received webhook event: ${eventType}`, payload);

  if (eventType === 'call.session_started') {
    const event = payload as CallSessionStartedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: 'Missing meetingId' }, { status: 400 });
    }

    const [existingMeeting] = await db
      .select()
      .from(meetings)
      .where(
        and(
          eq(meetings.id, meetingId),
          not(eq(meetings.status, 'completed')),
          not(eq(meetings.status, 'active')),
          not(eq(meetings.status, 'cancelled')),
          not(eq(meetings.status, 'processing')),
        ),
      );

    if (!existingMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    await db
      .update(meetings)
      .set({ status: 'active', startedAt: new Date() })
      .where(eq(meetings.id, existingMeeting.id));

    const [existingAgent] = await db
      .select()
      .from(agents)
      .where(eq(agents.id, existingMeeting.agentId));

    if (!existingAgent) {
      return NextResponse.json({ error: 'Agent not found' }, { status: 404 });
    }

    console.log('Connecting to call with agent:', existingAgent);

    // Register the agent as a Stream Video user first to set proper display name
    await streamVideo.upsertUsers([
      {
        id: existingAgent.id,
        name: existingAgent.name,
        role: 'admin',
        // Generate a consistent avatar for the agent using the same approach as other parts of the app
        image: generateAvatarUri({
          seed: existingAgent.name,
          variant: 'botttsNeutral',
        }),
      },
    ]);

    const call = streamVideo.video.call('default', meetingId);
    const realtimeClient = await streamVideo.video.connectOpenAi({
      call,
      openAiApiKey: ENV.OPENAI_API_KEY,
      agentUserId: existingAgent.id,
    });

    // Configure the agent's session with enhanced instructions including greeting behavior
    realtimeClient.updateSession({
      instructions: `${existingAgent.instructions}

IMPORTANT: When you first join the call, immediately introduce yourself by saying something like: "Hello everyone! I'm ${existingAgent.name}, your AI assistant for this meeting. I'm here to help with any questions or tasks you might have. How can I assist you today?"

Always be proactive in greeting new participants and maintain a friendly, professional tone throughout the conversation.`,
      name: existingAgent.name,
    });

    // Send an initial greeting message to trigger the agent to introduce itself
    realtimeClient.sendUserMessageContent([
      {
        type: 'input_text',
        text: 'You have just joined the video call. Please introduce yourself to the participants.',
      },
    ]);

    // Listen for participant events to greet new joiners
    realtimeClient.on('call.session_participant_joined', (event: any) => {
      console.log('New participant joined:', event.participant?.user_id);
      // Send a message to acknowledge the new participant
      realtimeClient.sendUserMessageContent([
        {
          type: 'input_text',
          text: `A new participant has joined the call. Please acknowledge them and offer assistance.`,
        },
      ]);
    });
  } else if (eventType === 'call.session_participant_left') {
    const event = payload as CallSessionParticipantLeftEvent;
    const meetingId = event.call_cid.split(':')[1];

    if (!meetingId) {
      return NextResponse.json({ error: 'Missing meetingId' }, { status: 400 });
    }

    const call = streamVideo.video.call('default', meetingId);
    await call.end();
  } else if (eventType === 'call.session_ended') {
    const event = payload as CallEndedEvent;
    const meetingId = event.call.custom?.meetingId;

    if (!meetingId) {
      return NextResponse.json({ error: 'Missing meetingId' }, { status: 400 });
    }
    await db
      .update(meetings)
      .set({
        status: 'processing',
        endedAt: new Date(),
      })
      .where(and(eq(meetings.id, meetingId), eq(meetings.status, 'active')));
  } else if (eventType === 'call.transcription_ready') {
    const event = payload as CallTranscriptionReadyEvent;
    const meetingId = event.call_cid.split(':')[1];

    const [updatedMeeting] = await db
      .update(meetings)
      .set({
        transcriptUrl: event.call_transcription.url,
      })
      .where(eq(meetings.id, meetingId))
      .returning();

    if (!updatedMeeting) {
      return NextResponse.json({ error: 'Meeting not found' }, { status: 404 });
    }

    // await inngest.send({
    //   name: 'meetings/processing',
    //   data: {
    //     meetingId: updatedMeeting.id,
    //     transcriptUrl: updatedMeeting.transcriptUrl,
    //   },
    // });
  } else if (eventType === 'call.recording_ready') {
    const event = payload as CallRecordingReadyEvent;
    const meetingId = event.call_cid.split(':')[1];

    await db
      .update(meetings)
      .set({
        recordingUrl: event.call_recording.url,
      })
      .where(eq(meetings.id, meetingId));
  }

  return NextResponse.json({ status: 'ok' });
}
