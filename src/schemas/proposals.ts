import { z } from "zod";
import {
  SpeakerSchema,
  FeedbackSchema,
  ProposalTimetableSchema,
} from "./common.js";

export const ProposalSchema = z.object({
  uuid: z.uuid().describe("プロポーザルID"),
  url: z.url().describe("プロポーザルページURL"),
  title: z.string().describe("タイトル"),
  abstract: z.string().describe("概要"),
  accepted: z.boolean().describe("採択済みかどうか"),
  speaker: SpeakerSchema.describe("スピーカー情報"),
  created: z.iso.datetime({ offset: true }).describe("作成日時"),
  timetable: ProposalTimetableSchema.optional().describe("タイムテーブル情報"),
  feedback: FeedbackSchema.describe("フィードバック情報"),
  slide_url: z.url().optional().describe("スライドURL"),
  blog_url: z.url().optional().describe("ブログ記事URL"),
});

export const ProposalsSchema = z.object({
  proposals: z.array(ProposalSchema).describe("プロポーザル一覧"),
});
