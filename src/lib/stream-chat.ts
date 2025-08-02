import 'server-only';

import { StreamChat } from 'stream-chat';

import { ENV } from './env';

export const streamChat = StreamChat.getInstance(
  ENV.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  ENV.STREAM_VIDEO_SERVER_KEY,
);
