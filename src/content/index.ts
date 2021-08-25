import { IEvent } from "@/shared/event";
import "./modules"
import settings from "./settings";
import siteLoad from "./watcher/site-load";
import logger from "@/content/utils/logger"

chrome.runtime.onMessage.addListener(async (event: IEvent) => {
    // Retrieve the previous and backup elements. 
    //
    // Definition is the following: [treeview_id][ids]
    //
    // This is needed because different treeviews will not send the 
    // already enabled items of other treeviews. For more information see 
    // https://github.com/not-matthias/refined-twitch/issues/7
    // 
    let previousElements: number[][] = await settings.get("previousElements") || [];
    let backupElements: number[][] = await settings.get("backupElements") || [];

    switch (event.type) {
        case "load":
            {
                siteLoad.loaded();
                break;
            }

        case "feature":
            {
                if (!previousElements[event.treeviewId]) {
                    previousElements[event.treeviewId] = [];
                }

                const enabledFeatures = event.ids.filter((i) => previousElements[event.treeviewId].indexOf(i) === -1);
                const disabledFeatures = previousElements[event.treeviewId].filter((i) => event.ids.indexOf(i) === -1);

                enabledFeatures.forEach((id) => settings.set(id.toString(), true));
                disabledFeatures.forEach((id) => settings.set(id.toString(), false));

                previousElements[event.treeviewId] = event.ids;
                break;
            }

        case "extension":
            if (event.enabled) {
                // Restore the previous enabled elements again
                //
                previousElements = backupElements;
                previousElements.forEach(ar => ar.forEach(id => settings.set(id.toString(), true)));
            } else {
                // Backup the enabled modules and disable all of them
                //
                backupElements = previousElements;
                backupElements.forEach(ar => ar.forEach(id => settings.set(id.toString(), false)));
            }

            break;

        default:
            logger.error("Failed to handle event: ", JSON.stringify(event));
    }

    settings.set("previousElements", previousElements);
    settings.set("backupElements", backupElements);
});