import 'server-only';

import { StreamClient } from '@stream-io/node-sdk';

import { ENV } from './env';

export const streamVideo = new StreamClient(
  ENV.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
  ENV.STREAM_VIDEO_SERVER_KEY,
);
