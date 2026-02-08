export type Sponsor = {
        id: string;
        name: string;
        kana: string;
        url: string;
        pr: string;
        twitter?: string | undefined;
        avatar?: string | undefined;
    };
export type SponsorPlan = {
        name: string;
        name_en?: string | undefined;
        sponsors: {
            id: string;
            name: string;
            kana: string;
            url: string;
            pr: string;
            twitter?: string | undefined;
            avatar?: string | undefined;
        }[];
    };
export type Sponsors = {
        sponsor_plans: {
            name: string;
            name_en?: string | undefined;
            sponsors: {
                id: string;
                name: string;
                kana: string;
                url: string;
                pr: string;
                twitter?: string | undefined;
                avatar?: string | undefined;
            }[];
        }[];
    };
