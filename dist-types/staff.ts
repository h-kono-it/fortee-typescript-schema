export type StaffMember = {
        id: string;
        name: string;
        url?: string | undefined;
        avatar_url?: string | undefined;
    };
export type StaffType = {
        name: string;
        staff: {
            id: string;
            name: string;
            url?: string | undefined;
            avatar_url?: string | undefined;
        }[];
    };
export type Staff = {
        staff_types: {
            name: string;
            staff: {
                id: string;
                name: string;
                url?: string | undefined;
                avatar_url?: string | undefined;
            }[];
        }[];
    };
