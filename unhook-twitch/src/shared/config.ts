export interface IGeneralConfig {
    show_followed_channels: boolean;
    show_recommendations: boolean;
}

export interface IConfig {
    general_config: IGeneralConfig;
}

export const DEFAULT_CONFIG: IConfig = {
    general_config: {
        show_followed_channels: false,
        show_recommendations: false,
    },
};

export const loadConfig: () => Promise<IConfig> = () => new Promise((resolve, reject) =>
    chrome.storage.sync.get(["config"], result => {
        // Set the value if undefined
        //
        if (!result.key) {



            return resolve(DEFAULT_CONFIG);
        }

        return resolve(result.key);
    }));

export const saveConfig = (config: IConfig) => {
    chrome.storage.sync.set({ config: config });
}