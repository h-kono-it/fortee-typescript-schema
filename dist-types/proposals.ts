export type Proposal = {
        /** プロポーザルID */
        uuid: string;
        /** プロポーザルページURL */
        url: string;
        /** タイトル */
        title: string;
        /** 概要 */
        abstract: string;
        /** 採択済みかどうか */
        accepted: boolean;
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
        /** 作成日時 */
        created: string;
        /** タイムテーブル情報 */
        timetable?: {
            /** トラック名 */
            track: string;
            /** 開始日時 */
            starts_at: string;
            /** セッション時間（分） */
            length_min: number;
        } | undefined;
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
export type Proposals = {
        /** プロポーザル一覧 */
        proposals: {
            /** プロポーザルID */
            uuid: string;
            /** プロポーザルページURL */
            url: string;
            /** タイトル */
            title: string;
            /** 概要 */
            abstract: string;
            /** 採択済みかどうか */
            accepted: boolean;
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
            /** 作成日時 */
            created: string;
            /** タイムテーブル情報 */
            timetable?: {
                /** トラック名 */
                track: string;
                /** 開始日時 */
                starts_at: string;
                /** セッション時間（分） */
                length_min: number;
            } | undefined;
            /** フィードバック情報 */
            feedback: {
                /** フィードバック受付中かどうか */
                open: boolean;
            };
            /** スライドURL */
            slide_url?: string | undefined;
            /** ブログ記事URL */
            blog_url?: string | undefined;
        }[];
    };
