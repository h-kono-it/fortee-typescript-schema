import { z } from "zod";

// TODO: 実データ入手後にスキーマを定義する
// 現状 kinoko-2025 / kinoko-2026 ともにデータなし
export const NewsSchema = z.object({}).or(z.object({ news: z.array(z.unknown()) }));
