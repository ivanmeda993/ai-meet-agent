import { type AppRouterOutputs } from '@/trpc/routers/_app';

export type MeetingGetOne = AppRouterOutputs['meetings']['getOne'];
export type MeetingGetMany = AppRouterOutputs['meetings']['getMany']['items'];
export enum MeetingStatus {
  upcoming = 'upcoming',
  active = 'active',
  completed = 'completed',
  processing = 'processing',
  cancelled = 'cancelled',
}

export type StreamTranscriptItem = {
  speaker_id: string;
  type: string;
  text: string;
  start_ts: number;
  stop_ts: number;
};
