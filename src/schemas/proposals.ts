import { z } from "zod";
import {
  SpeakerSchema,
  FeedbackSchema,
  ProposalTimetableSchema,
} from "./common.js";

export const ProposalSchema = z.object({
  uuid: z.uuid(),
  url: z.url(),
  title: z.string(),
  abstract: z.string(),
  accepted: z.boolean(),
  speaker: SpeakerSchema,
  created: z.iso.datetime({ offset: true }),
  timetable: ProposalTimetableSchema.optional(),
  feedback: FeedbackSchema,
  slide_url: z.url().optional(),
  blog_url: z.url().optional(),
});

export const ProposalsSchema = z.object({
  proposals: z.array(ProposalSchema),
});
