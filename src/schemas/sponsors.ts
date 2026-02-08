import { z } from "zod";

export const SponsorSchema = z.object({
  id: z.uuid().describe("スポンサーID"),
  name: z.string().describe("スポンサー名"),
  kana: z.string().describe("スポンサー名（かな）"),
  url: z.url().describe("WebサイトURL"),
  pr: z.string().describe("PR文"),
  twitter: z.string().optional().describe("Twitterアカウント"),
  avatar: z.url().optional().describe("アバター画像URL"),
});

export const SponsorPlanSchema = z.object({
  name: z.string().describe("プラン名"),
  name_en: z.string().optional().describe("プラン名（英語）"),
  sponsors: z.array(SponsorSchema).describe("スポンサー一覧"),
});

export const SponsorsSchema = z.object({
  sponsor_plans: z.array(SponsorPlanSchema).describe("スポンサープラン一覧"),
});
