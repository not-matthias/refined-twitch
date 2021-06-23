import { IEventType, IEvent } from "@/shared/event";
import "./modules"
import settings from "./settings";
import Watcher from './watcher';

new Watcher().setup();

let previousElements: number[] = [];
chrome.runtime.onMessage.addListener((elements: number[]) => {
    console.log("Received elements: ", elements);

    const enabledFeatures = elements.filter((i) => previousElements.indexOf(i) === -1);
    const disabledFeatures = previousElements.filter((i) => elements.indexOf(i) === -1);
    
    enabledFeatures.forEach((id) => settings.set(id.toString(), true));
    disabledFeatures.forEach((id) => settings.set(id.toString(), false));

    previousElements = elements;
});