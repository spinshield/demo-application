export interface User {
    id: number;
    name: string;
    email: string;
    fs_available: number;
    fs_spins: number;
    usd: number;
    email_verified_at: string;
}
export interface Games {
    id: string;
    n: string;
    p: string;
    s: string;
    fs: boolean;
    fb: boolean;
    d: boolean;
}

export interface activeJackpots {
    id: number;
    category: string;
    amount: string;
    symbol: string;
    currency: string;
    created_at: string;
    updated_at: string;
}
export interface CarouselImages {
    id: number;
    url: string;
    title: string;
    desc: string;
}
export interface showOptions {
    defaultFilter: string;
    freeRounds: Array<any>;
    showAuthButtons: boolean;
    server: string;
}



export type ProfilePageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    },
};
  
export type CasinoGamesProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    games: Games,
    showOptions: showOptions,
};

export type CasinoPageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    },
    images: CarouselImages,
    games: Games,
    showOptions: showOptions,
    jackpots: {
        small: activeJackpots,
        medium: activeJackpots,
    },
};
