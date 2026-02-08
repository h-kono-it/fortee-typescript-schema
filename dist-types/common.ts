export type Speaker = {
        name: string;
        kana: string;
        twitter?: string | undefined;
        avatar_url?: string | undefined;
    };
export type Feedback = {
        open: boolean;
    };
export type ProposalTimetable = {
        track: string;
        starts_at: string;
        length_min: number;
    };
export type TimetableTrack = {
        name: string;
        sort: number;
    };
