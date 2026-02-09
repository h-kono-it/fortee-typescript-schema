/**
 * fortee APIのスポンサー関連の型定義。カンファレンスのスポンサー情報の型を提供します。
 * @module
 */
export type Sponsor = {
        /** スポンサーID */
        id: string;
        /** スポンサー名 */
        name: string;
        /** スポンサー名（かな） */
        kana: string;
        /** WebサイトURL */
        url: string;
        /** PR文 */
        pr: string;
        /** Twitterアカウント */
        twitter?: string | undefined;
        /** アバター画像URL */
        avatar?: string | undefined;
    };
export type SponsorPlan = {
        /** プラン名 */
        name: string;
        /** プラン名（英語） */
        name_en?: string | undefined;
        /** スポンサー一覧 */
        sponsors: {
            /** スポンサーID */
            id: string;
            /** スポンサー名 */
            name: string;
            /** スポンサー名（かな） */
            kana: string;
            /** WebサイトURL */
            url: string;
            /** PR文 */
            pr: string;
            /** Twitterアカウント */
            twitter?: string | undefined;
            /** アバター画像URL */
            avatar?: string | undefined;
        }[];
    };
export type Sponsors = {
        /** スポンサープラン一覧 */
        sponsor_plans: {
            /** プラン名 */
            name: string;
            /** プラン名（英語） */
            name_en?: string | undefined;
            /** スポンサー一覧 */
            sponsors: {
                /** スポンサーID */
                id: string;
                /** スポンサー名 */
                name: string;
                /** スポンサー名（かな） */
                kana: string;
                /** WebサイトURL */
                url: string;
                /** PR文 */
                pr: string;
                /** Twitterアカウント */
                twitter?: string | undefined;
                /** アバター画像URL */
                avatar?: string | undefined;
            }[];
        }[];
    };
