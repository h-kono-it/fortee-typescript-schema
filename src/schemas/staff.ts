import { z } from "zod";

// staff_structured.json 形式を採用
// url, avatar_url はオプショナル（一部のスタッフに存在しない）
export const StaffMemberSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  url: z.url().optional(),
  avatar_url: z.url().optional(),
});

export const StaffTypeSchema = z.object({
  name: z.string(),
  staff: z.array(StaffMemberSchema),
});

export const StaffSchema = z.object({
  staff_types: z.array(StaffTypeSchema),
});
