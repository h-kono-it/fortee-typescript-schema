/**
 * fortee APIのタイムテーブル関連の型定義。カンファレンスのスケジュール情報の型を提供します。
 * @module
 */
/** タグ情報 */
export type Tag = {
        /** タグ名 */
        name: string;
        /** テキスト色 */
        color_text: string;
        /** 背景色 */
        color_background: string;
    };
/** タイムテーブルのタイムスロット情報 */
export type TimetableTimeslot = {
        /** エントリ種別 */
        type: "timeslot";
        /** タイムスロットID */
        uuid: string;
        /** タイトル */
        title: string;
        /** 概要 */
        abstract: string | null;
        /** トラック情報 */
        track: {
            /** トラック名 */
            name: string;
            /** ソート順 */
            sort: number;
        };
        /** 開始日時 */
        starts_at: string;
        /** 時間（分） */
        length_min: number;
    };
/** タイムテーブルのトーク情報 */
export type TimetableTalk = {
        /** エントリ種別 */
        type: "talk";
        /** トークID */
        uuid: string;
        /** トークページURL */
        url: string;
        /** タイトル */
        title: string;
        /** 概要 */
        abstract: string;
        /** 採択済みかどうか */
        accepted: boolean;
        /** トラック情報 */
        track: {
            /** トラック名 */
            name: string;
            /** ソート順 */
            sort: number;
        };
        /** 開始日時 */
        starts_at: string;
        /** セッション時間（分） */
        length_min: number;
        /** タグ一覧 */
        tags: {
            /** タグ名 */
            name: string;
            /** テキスト色 */
            color_text: string;
            /** 背景色 */
            color_background: string;
        }[];
        /** スピーカー情報 */
        speaker: {
            /** スピーカー名 */
            name: string;
            /** スピーカー名（かな） */
            kana: string;
            /** Twitterアカウント */
            twitter?: string | undefined;
            /** アバター画像URL */
            avatar_url?: string | undefined;
        };
        /** お気に入り済みかどうか */
        fav: boolean;
        /** お気に入り数 */
        fav_count: number;
        /** フィードバック情報 */
        feedback: {
            /** フィードバック受付中かどうか */
            open: boolean;
        };
        /** スライドURL */
        slide_url?: string | undefined;
        /** ブログ記事URL */
        blog_url?: string | undefined;
    };
/** タイムテーブルのエントリ（タイムスロットまたはトーク） */
export type TimetableEntry = {
        /** エントリ種別 */
        type: "timeslot";
        /** タイムスロットID */
        uuid: string;
        /** タイトル */
        title: string;
        /** 概要 */
        abstract: string | null;
        /** トラック情報 */
        track: {
            /** トラック名 */
            name: string;
            /** ソート順 */
            sort: number;
        };
        /** 開始日時 */
        starts_at: string;
        /** 時間（分） */
        length_min: number;
    } | {
        /** エントリ種別 */
        type: "talk";
        /** トークID */
        uuid: string;
        /** トークページURL */
        url: string;
        /** タイトル */
        title: string;
        /** 概要 */
        abstract: string;
        /** 採択済みかどうか */
        accepted: boolean;
        /** トラック情報 */
        track: {
            /** トラック名 */
            name: string;
            /** ソート順 */
            sort: number;
        };
        /** 開始日時 */
        starts_at: string;
        /** セッション時間（分） */
        length_min: number;
        /** タグ一覧 */
        tags: {
            /** タグ名 */
            name: string;
            /** テキスト色 */
            color_text: string;
            /** 背景色 */
            color_background: string;
        }[];
        /** スピーカー情報 */
        speaker: {
            /** スピーカー名 */
            name: string;
            /** スピーカー名（かな） */
            kana: string;
            /** Twitterアカウント */
            twitter?: string | undefined;
            /** アバター画像URL */
            avatar_url?: string | undefined;
        };
        /** お気に入り済みかどうか */
        fav: boolean;
        /** お気に入り数 */
        fav_count: number;
        /** フィードバック情報 */
        feedback: {
            /** フィードバック受付中かどうか */
            open: boolean;
        };
        /** スライドURL */
        slide_url?: string | undefined;
        /** ブログ記事URL */
        blog_url?: string | undefined;
    };
/** タイムテーブル */
export type Timetable = {
        /** タイムテーブルエントリ一覧 */
        timetable: ({
            /** エントリ種別 */
            type: "timeslot";
            /** タイムスロットID */
            uuid: string;
            /** タイトル */
            title: string;
            /** 概要 */
            abstract: string | null;
            /** トラック情報 */
            track: {
                /** トラック名 */
                name: string;
                /** ソート順 */
                sort: number;
            };
            /** 開始日時 */
            starts_at: string;
            /** 時間（分） */
            length_min: number;
        } | {
            /** エントリ種別 */
            type: "talk";
            /** トークID */
            uuid: string;
            /** トークページURL */
            url: string;
            /** タイトル */
            title: string;
            /** 概要 */
            abstract: string;
            /** 採択済みかどうか */
            accepted: boolean;
            /** トラック情報 */
            track: {
                /** トラック名 */
                name: string;
                /** ソート順 */
                sort: number;
            };
            /** 開始日時 */
            starts_at: string;
            /** セッション時間（分） */
            length_min: number;
            /** タグ一覧 */
            tags: {
                /** タグ名 */
                name: string;
                /** テキスト色 */
                color_text: string;
                /** 背景色 */
                color_background: string;
            }[];
            /** スピーカー情報 */
            speaker: {
                /** スピーカー名 */
                name: string;
                /** スピーカー名（かな） */
                kana: string;
                /** Twitterアカウント */
                twitter?: string | undefined;
                /** アバター画像URL */
                avatar_url?: string | undefined;
            };
            /** お気に入り済みかどうか */
            fav: boolean;
            /** お気に入り数 */
            fav_count: number;
            /** フィードバック情報 */
            feedback: {
                /** フィードバック受付中かどうか */
                open: boolean;
            };
            /** スライドURL */
            slide_url?: string | undefined;
            /** ブログ記事URL */
            blog_url?: string | undefined;
        })[];
    };
