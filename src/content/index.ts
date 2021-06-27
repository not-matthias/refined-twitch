import { IEvent } from "@/shared/event";
import "./modules"
import settings from "./settings";
import siteLoad from "./watcher/site-load";
import logger from "@/content/utils/logger"

let previousElements: number[] = [];
chrome.runtime.onMessage.addListener((event: IEvent) => {
    switch (event.type) {
        case "load":
            {
                siteLoad.loaded();
                break;
            }

        case "feature":
            {
                const enabledFeatures = event.ids.filter((i) => previousElements.indexOf(i) === -1);
                const disabledFeatures = previousElements.filter((i) => event.ids.indexOf(i) === -1);

                enabledFeatures.forEach((id) => settings.set(id.toString(), true));
                disabledFeatures.forEach((id) => settings.set(id.toString(), false));

                previousElements = event.ids;
                break;
            }
        default:
            logger.error("Failed to handle event: ", JSON.stringify(event));

    }
});