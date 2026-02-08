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
