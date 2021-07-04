import { EventEmitter, Listener } from "events";

class SiteLoadWatcher extends EventEmitter {
    onLoaded(listener: Listener) {
        this.on("site-loaded", listener);
    }

    loaded() {
        this.emit("site-loaded");
    }
}

export default new SiteLoadWatcher();