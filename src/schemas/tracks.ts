import { z } from "zod";

export const TrackSchema = z.object({
  id: z.uuid().describe("トラックID"),
  name: z.string().describe("トラック名"),
  hashtag: z.string().describe("ハッシュタグ"),
});

export const TracksSchema = z.object({
  tracks: z.array(TrackSchema).describe("トラック一覧"),
});
