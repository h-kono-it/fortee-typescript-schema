export type Proposal = {
        uuid: string;
        url: string;
        title: string;
        abstract: string;
        accepted: boolean;
        speaker: {
            name: string;
            kana: string;
            twitter?: string | undefined;
            avatar_url?: string | undefined;
        };
        created: string;
        timetable?: {
            track: string;
            starts_at: string;
            length_min: number;
        } | undefined;
        feedback: {
            open: boolean;
        };
        slide_url?: string | undefined;
        blog_url?: string | undefined;
    };
export type Proposals = {
        proposals: {
            uuid: string;
            url: string;
            title: string;
            abstract: string;
            accepted: boolean;
            speaker: {
                name: string;
                kana: string;
                twitter?: string | undefined;
                avatar_url?: string | undefined;
            };
            created: string;
            timetable?: {
                track: string;
                starts_at: string;
                length_min: number;
            } | undefined;
            feedback: {
                open: boolean;
            };
            slide_url?: string | undefined;
            blog_url?: string | undefined;
        }[];
    };
