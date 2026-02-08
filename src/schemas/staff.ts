import { z } from "zod";

// staff_structured.json 形式を採用
// url, avatar_url はオプショナル（一部のスタッフに存在しない）
export const StaffMemberSchema = z.object({
  id: z.uuid().describe("スタッフID"),
  name: z.string().describe("スタッフ名"),
  url: z.url().optional().describe("WebサイトURL"),
  avatar_url: z.url().optional().describe("アバター画像URL"),
});

export const StaffTypeSchema = z.object({
  name: z.string().describe("スタッフ種別名"),
  staff: z.array(StaffMemberSchema).describe("スタッフ一覧"),
});

export const StaffSchema = z.object({
  staff_types: z.array(StaffTypeSchema).describe("スタッフ種別一覧"),
});
