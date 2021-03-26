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
    streamItems: number[];
    miscItems: number[];
}

export const DEFAULT_CONFIG: IConfig = {
    generalItems: [],
    streamItems: [],
    miscItems: []
};

export const loadConfig: () => Promise<IConfig> = () => new Promise((resolve) =>
    chrome.storage.sync.get("config", result => {
        // Set the value if undefined
        //
        if (!result || !result.config) {
            return resolve(Object.assign({}, DEFAULT_CONFIG));
        }

        return resolve(result.config);
    }));

export const saveConfig = (config: IConfig): void => {
    chrome.storage.sync.set({ config: config });
}