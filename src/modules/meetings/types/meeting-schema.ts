import { z } from 'zod';

import {
  DEFAULT_PAGE,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
} from '@/lib/constants';

import { MeetingStatus } from './meeting-types';
export const getOneMeetingSchema = z.object({
  id: z.string(),
});

export const getManyMeetingsSchema = z.object({
  page: z.number().default(DEFAULT_PAGE),
  pageSize: z
    .number()
    .min(MIN_PAGE_SIZE)
    .max(MAX_PAGE_SIZE)
    .default(DEFAULT_PAGE_SIZE),
  search: z.string().nullish(),
  agentId: z.string().nullish(),
  status: z
    .enum([
      MeetingStatus.upcoming,
      MeetingStatus.active,
      MeetingStatus.completed,
      MeetingStatus.processing,
      MeetingStatus.cancelled,
    ])
    .nullish(),
});

export const meetingsInsertSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  agentId: z.string().min(1, { message: 'Agent is required' }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: 'Id is required' }),
});
