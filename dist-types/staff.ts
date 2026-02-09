/**
 * fortee APIのスタッフ関連の型定義。カンファレンスの運営スタッフ情報の型を提供します。
 * @module
 */
/** スタッフメンバー情報 */
export type StaffMember = {
        /** スタッフID */
        id: string;
        /** スタッフ名 */
        name: string;
        /** WebサイトURL */
        url?: string | undefined;
        /** アバター画像URL */
        avatar_url?: string | undefined;
    };
/** スタッフ種別情報 */
export type StaffType = {
        /** スタッフ種別名 */
        name: string;
        /** スタッフ一覧 */
        staff: {
            /** スタッフID */
            id: string;
            /** スタッフ名 */
            name: string;
            /** WebサイトURL */
            url?: string | undefined;
            /** アバター画像URL */
            avatar_url?: string | undefined;
        }[];
    };
/** スタッフ一覧 */
export type Staff = {
        /** スタッフ種別一覧 */
        staff_types: {
            /** スタッフ種別名 */
            name: string;
            /** スタッフ一覧 */
            staff: {
                /** スタッフID */
                id: string;
                /** スタッフ名 */
                name: string;
                /** WebサイトURL */
                url?: string | undefined;
                /** アバター画像URL */
                avatar_url?: string | undefined;
            }[];
        }[];
    };
