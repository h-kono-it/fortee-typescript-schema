import { z } from "zod";
import {
  SpeakerSchema,
  FeedbackSchema,
  ProposalTimetableSchema,
} from "./common.js";

export const ProposalSchema = z.object({
  uuid: z.string().uuid(),
  url: z.string().url(),
  title: z.string(),
  abstract: z.string(),
  accepted: z.boolean(),
  speaker: SpeakerSchema,
  created: z.string().datetime({ offset: true }),
  timetable: ProposalTimetableSchema.optional(),
  feedback: FeedbackSchema,
  slide_url: z.string().url().optional(),
  blog_url: z.string().url().optional(),
});

export const ProposalsSchema = z.object({
  proposals: z.array(ProposalSchema),
});
