import { EventEmitter, Listener } from "events";

class SiteLoadWatcher extends EventEmitter {
    private _listenerCount = 0;

    onLoaded(listener: Listener) {
        this.on("site-loaded", listener);
    }

    loaded() {
        this.emit("site-loaded");
    }
}

export default new SiteLoadWatcher();