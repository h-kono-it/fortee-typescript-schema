import { z } from "zod";
import {
  SpeakerSchema,
  FeedbackSchema,
  TimetableTrackSchema,
} from "./common.js";

// Tag（timetable内のtalkに付与されるラベル）
const TagSchema = z.object({
  name: z.string().describe("タグ名"),
  color_text: z.string().describe("テキスト色"),
  color_background: z.string().describe("背景色"),
});

// timetable内の timeslot エントリ（受付、オープニング等）
const TimetableTimeslotSchema = z.object({
  type: z.literal("timeslot").describe("エントリ種別"),
  uuid: z.uuid().describe("タイムスロットID"),
  title: z.string().describe("タイトル"),
  abstract: z.string().nullable().describe("概要"),
  track: TimetableTrackSchema.describe("トラック情報"),
  starts_at: z.iso.datetime({ offset: true }).describe("開始日時"),
  length_min: z.number().int().describe("時間（分）"),
});

// timetable内の talk エントリ（セッション）
const TimetableTalkSchema = z.object({
  type: z.literal("talk").describe("エントリ種別"),
  uuid: z.uuid().describe("トークID"),
  url: z.url().describe("トークページURL"),
  title: z.string().describe("タイトル"),
  abstract: z.string().describe("概要"),
  accepted: z.boolean().describe("採択済みかどうか"),
  track: TimetableTrackSchema.describe("トラック情報"),
  starts_at: z.iso.datetime({ offset: true }).describe("開始日時"),
  length_min: z.number().int().describe("セッション時間（分）"),
  tags: z.array(TagSchema).describe("タグ一覧"),
  speaker: SpeakerSchema.describe("スピーカー情報"),
  fav: z.boolean().describe("お気に入り済みかどうか"),
  fav_count: z.number().int().describe("お気に入り数"),
  feedback: FeedbackSchema.describe("フィードバック情報"),
  slide_url: z.url().optional().describe("スライドURL"),
  blog_url: z.url().optional().describe("ブログ記事URL"),
});

export const TimetableEntrySchema = z.discriminatedUnion("type", [
  TimetableTimeslotSchema,
  TimetableTalkSchema,
]);

export const TimetableSchema = z.object({
  timetable: z.array(TimetableEntrySchema).describe("タイムテーブルエントリ一覧"),
});

export { TimetableTimeslotSchema, TimetableTalkSchema, TagSchema };
