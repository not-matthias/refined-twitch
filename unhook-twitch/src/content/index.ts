import { IEventType, IEvent } from "@/shared/event";
import "./modules"
import settings from "./settings";
import Watcher from './watcher';

new Watcher().setup();


chrome.runtime.onMessage.addListener((event: IEvent) => {
    console.log("Received event: ", event);

    switch (event.event_type) {
        case IEventType.Enabled:
            event.ids.forEach((id) => settings.set(id.toString(), true));
            break;

        case IEventType.Disabled:
            event.ids.forEach((id) => settings.set(id.toString(), false));
            break;
    }
});