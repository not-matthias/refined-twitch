export enum ConfigIds {
    // === General Config ===
    //

    // Left Sidebar
    //
    FOLLOWED_CHANNELS,
    RECOMMENDED_CHANNELS,

    // Header
    //
    FOLLOWING,
    BROWSE,
    PRIME_GAMING_LOOT,
    NOTIFICATIONS,

    // === Home Config ===
    //
    FRONT_PAGE_CAROUSEL,
    RECOMMENDED_STREAMS,
    RECOMMENDED_CATEGORIES,
    RECOMMENDED_CLIPS,

    // === Stream Config ===
    // 

    // Chat
    //
    CHAT_WINDOW,
    POLLS,
    BETS,

    // Information
    //
    VIEWER_COUNT,
    LIVE_TIME,

    // Actions
    //
    FOLLOW,
    SUBSCRIBE,

    // Description
    //
    STREAM_DESCRIPTION,
    METADATA,

    // Other
    //
    SOCIAL_MEDIA,
    CHANNEL_PANEL,
    EXTENSIONS,
}

/**
 * The config with all the selected item ids.
 */
export interface IConfig {
    generalItems: number[];
    homeItems: number[];
    streamItems: number[];
    miscItems: number[];
}

export const DEFAULT_CONFIG: IConfig = {
    generalItems: [],
    homeItems: [],
    streamItems: [],
    miscItems: []
};
