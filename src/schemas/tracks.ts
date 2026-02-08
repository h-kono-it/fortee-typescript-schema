import { z } from "zod";

export const TrackSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  hashtag: z.string(),
});

export const TracksSchema = z.object({
  tracks: z.array(TrackSchema),
});
