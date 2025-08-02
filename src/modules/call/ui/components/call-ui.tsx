import '@stream-io/video-react-sdk/dist/css/styles.css';

import { StreamTheme, useCall } from '@stream-io/video-react-sdk';
import { useState } from 'react';

import { MatchComponent } from '@/components/match-component';

import { CallActive } from './call-active';
import { CallEnded } from './call-ended';
import { CallLobby } from './call-lobby';

interface Props {
  meetingName: string;
}

export const CallUI = ({ meetingName }: Props) => {
  const call = useCall();
  const [show, setShow] = useState<'lobby' | 'call' | 'ended'>('lobby');

  const handleJoin = async () => {
    if (!call) return;

    await call.join();

    setShow('call');
  };
  const handleLeave = () => {
    if (!call) return;

    call.endCall();
    setShow('ended');
  };

  return (
    <StreamTheme className='h-full'>
      <MatchComponent
        value={show}
        lobby={() => <CallLobby onJoin={handleJoin} />}
        call={() => (
          <CallActive onLeave={handleLeave} meetingName={meetingName} />
        )}
        ended={() => <CallEnded />}
      />
    </StreamTheme>
  );
};
