export type Track = {
        /** トラックID */
        id: string;
        /** トラック名 */
        name: string;
        /** ハッシュタグ */
        hashtag: string;
    };
export type Tracks = {
        /** トラック一覧 */
        tracks: {
            /** トラックID */
            id: string;
            /** トラック名 */
            name: string;
            /** ハッシュタグ */
            hashtag: string;
        }[];
    };
