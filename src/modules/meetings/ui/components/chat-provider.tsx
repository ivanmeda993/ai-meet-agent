'use client';

import { LoadingFallback } from '@/components/ui/loading-fallback';
import { authClient } from '@/lib/auth-client';

import { ChatUI } from './chat-ui';

interface Props {
  meetingId: string;
  meetingName: string;
}

export const ChatProvider = ({ meetingId, meetingName }: Props) => {
  const { data, isPending } = authClient.useSession();

  if (isPending || !data?.user) {
    return <LoadingFallback message='Loading chat... ' />;
  }

  return (
    <ChatUI
      meetingId={meetingId}
      meetingName={meetingName}
      userId={data.user.id}
      userName={data.user.name}
      userImage={data.user.image ?? ''}
    />
  );
};
