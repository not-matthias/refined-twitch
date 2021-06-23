import { EventEmitter } from "events";

class Settings extends EventEmitter {
    public get(key: string): Promise<any> {
        return new Promise((resolve, reject) =>
            chrome.storage.sync.get(key, result =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve(result[key])
            )
        );
    }

    public set(key: string, value: any): Promise<void> {
        this.emit(`changed.${key}`, value);

        return new Promise((resolve, reject) =>
            chrome.storage.sync.set({ [key]: value }, () =>
                chrome.runtime.lastError
                    ? reject(Error(chrome.runtime.lastError.message))
                    : resolve()
            )
        );
    }
}

export default new Settings();