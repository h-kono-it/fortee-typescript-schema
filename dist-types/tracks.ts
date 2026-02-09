/**
 * fortee APIのトラック関連の型定義。カンファレンスのトラック情報の型を提供します。
 * @module
 */
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
