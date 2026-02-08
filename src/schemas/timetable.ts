import { z } from "zod";
import {
  SpeakerSchema,
  FeedbackSchema,
  TimetableTrackSchema,
} from "./common.js";

// Tag（timetable内のtalkに付与されるラベル）
const TagSchema = z.object({
  name: z.string(),
  color_text: z.string(),
  color_background: z.string(),
});

// timetable内の timeslot エントリ（受付、オープニング等）
const TimetableTimeslotSchema = z.object({
  type: z.literal("timeslot"),
  uuid: z.string().uuid(),
  title: z.string(),
  abstract: z.string().nullable(),
  track: TimetableTrackSchema,
  starts_at: z.string().datetime({ offset: true }),
  length_min: z.number().int(),
});

// timetable内の talk エントリ（セッション）
const TimetableTalkSchema = z.object({
  type: z.literal("talk"),
  uuid: z.string().uuid(),
  url: z.string().url(),
  title: z.string(),
  abstract: z.string(),
  accepted: z.boolean(),
  track: TimetableTrackSchema,
  starts_at: z.string().datetime({ offset: true }),
  length_min: z.number().int(),
  tags: z.array(TagSchema),
  speaker: SpeakerSchema,
  fav: z.boolean(),
  fav_count: z.number().int(),
  feedback: FeedbackSchema,
  slide_url: z.string().url().optional(),
  blog_url: z.string().url().optional(),
});

export const TimetableEntrySchema = z.discriminatedUnion("type", [
  TimetableTimeslotSchema,
  TimetableTalkSchema,
]);

export const TimetableSchema = z.object({
  timetable: z.array(TimetableEntrySchema),
});

export { TimetableTimeslotSchema, TimetableTalkSchema, TagSchema };
