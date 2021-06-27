import { ILoadEvent } from "@/shared/event";

/**
 * Wait for `https://gql.twitch.tv/gql` web requests
 */
chrome.webRequest.onCompleted.addListener(
    details => {
        chrome.tabs.sendMessage(details.tabId, { type: "load", url: details.url } as ILoadEvent);
    },
    { urls: ["*://gql.twitch.tv/*"] }
);
