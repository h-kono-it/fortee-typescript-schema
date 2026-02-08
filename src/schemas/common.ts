import { z } from "zod";

// --- 共通: Speaker ---
// proposals / timetable で共通のSpeaker型
// twitter, avatar_url はオプショナル（一部のspeakerに存在しない）
export const SpeakerSchema = z.object({
  name: z.string(),
  kana: z.string(),
  twitter: z.string().optional(),
  avatar_url: z.url().optional(),
});

// --- 共通: Feedback ---
export const FeedbackSchema = z.object({
  open: z.boolean(),
});

// --- 共通: Timetable (proposals内) ---
export const ProposalTimetableSchema = z.object({
  track: z.string(),
  starts_at: z.string().datetime({ offset: true }),
  length_min: z.number().int(),
});

// --- 共通: Track (timetable内) ---
export const TimetableTrackSchema = z.object({
  name: z.string(),
  sort: z.number().int(),
});
