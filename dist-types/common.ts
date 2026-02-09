/**
 * fortee APIの共通型定義。Speaker, Feedbackなど複数のエンドポイントで共通して使われる型を提供します。
 * @module
 */
/** スピーカー情報 */
export type Speaker = {
        /** スピーカー名 */
        name: string;
        /** スピーカー名（かな） */
        kana: string;
        /** Twitterアカウント */
        twitter?: string | undefined;
        /** アバター画像URL */
        avatar_url?: string | undefined;
    };
/** フィードバック情報 */
export type Feedback = {
        /** フィードバック受付中かどうか */
        open: boolean;
    };
/** プロポーザルのタイムテーブル情報 */
export type ProposalTimetable = {
        /** トラック名 */
        track: string;
        /** 開始日時 */
        starts_at: string;
        /** セッション時間（分） */
        length_min: number;
    };
/** タイムテーブルのトラック情報 */
export type TimetableTrack = {
        /** トラック名 */
        name: string;
        /** ソート順 */
        sort: number;
    };
