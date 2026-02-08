export type Tag = {
        name: string;
        color_text: string;
        color_background: string;
    };
export type TimetableTimeslot = {
        type: "timeslot";
        uuid: string;
        title: string;
        abstract: string | null;
        track: {
            name: string;
            sort: number;
        };
        starts_at: string;
        length_min: number;
    };
export type TimetableTalk = {
        type: "talk";
        uuid: string;
        url: string;
        title: string;
        abstract: string;
        accepted: boolean;
        track: {
            name: string;
            sort: number;
        };
        starts_at: string;
        length_min: number;
        tags: {
            name: string;
            color_text: string;
            color_background: string;
        }[];
        speaker: {
            name: string;
            kana: string;
            twitter?: string | undefined;
            avatar_url?: string | undefined;
        };
        fav: boolean;
        fav_count: number;
        feedback: {
            open: boolean;
        };
        slide_url?: string | undefined;
        blog_url?: string | undefined;
    };
export type TimetableEntry = {
        type: "timeslot";
        uuid: string;
        title: string;
        abstract: string | null;
        track: {
            name: string;
            sort: number;
        };
        starts_at: string;
        length_min: number;
    } | {
        type: "talk";
        uuid: string;
        url: string;
        title: string;
        abstract: string;
        accepted: boolean;
        track: {
            name: string;
            sort: number;
        };
        starts_at: string;
        length_min: number;
        tags: {
            name: string;
            color_text: string;
            color_background: string;
        }[];
        speaker: {
            name: string;
            kana: string;
            twitter?: string | undefined;
            avatar_url?: string | undefined;
        };
        fav: boolean;
        fav_count: number;
        feedback: {
            open: boolean;
        };
        slide_url?: string | undefined;
        blog_url?: string | undefined;
    };
export type Timetable = {
        timetable: ({
            type: "timeslot";
            uuid: string;
            title: string;
            abstract: string | null;
            track: {
                name: string;
                sort: number;
            };
            starts_at: string;
            length_min: number;
        } | {
            type: "talk";
            uuid: string;
            url: string;
            title: string;
            abstract: string;
            accepted: boolean;
            track: {
                name: string;
                sort: number;
            };
            starts_at: string;
            length_min: number;
            tags: {
                name: string;
                color_text: string;
                color_background: string;
            }[];
            speaker: {
                name: string;
                kana: string;
                twitter?: string | undefined;
                avatar_url?: string | undefined;
            };
            fav: boolean;
            fav_count: number;
            feedback: {
                open: boolean;
            };
            slide_url?: string | undefined;
            blog_url?: string | undefined;
        })[];
    };
