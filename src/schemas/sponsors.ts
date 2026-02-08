import { z } from "zod";

export const SponsorSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  kana: z.string(),
  url: z.url(),
  pr: z.string(),
  twitter: z.string().optional(),
  avatar: z.url().optional(),
});

export const SponsorPlanSchema = z.object({
  name: z.string(),
  name_en: z.string().optional(),
  sponsors: z.array(SponsorSchema),
});

export const SponsorsSchema = z.object({
  sponsor_plans: z.array(SponsorPlanSchema),
});
