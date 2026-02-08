import { z } from "zod";

// --- 共通: Speaker ---
// proposals / timetable で共通のSpeaker型
// twitter, avatar_url はオプショナル（一部のspeakerに存在しない）
export const SpeakerSchema = z.object({
  name: z.string().describe("スピーカー名"),
  kana: z.string().describe("スピーカー名（かな）"),
  twitter: z.string().optional().describe("Twitterアカウント"),
  avatar_url: z.url().optional().describe("アバター画像URL"),
});

// --- 共通: Feedback ---
export const FeedbackSchema = z.object({
  open: z.boolean().describe("フィードバック受付中かどうか"),
});

// --- 共通: Timetable (proposals内) ---
export const ProposalTimetableSchema = z.object({
  track: z.string().describe("トラック名"),
  starts_at: z.iso.datetime({ offset: true }).describe("開始日時"),
  length_min: z.number().int().describe("セッション時間（分）"),
});

// --- 共通: Track (timetable内) ---
export const TimetableTrackSchema = z.object({
  name: z.string().describe("トラック名"),
  sort: z.number().int().describe("ソート順"),
});
