console.log("Background script")

// Wait for `https://gql.twitch.tv/gql` web requests

let currentUrl = '';
let tabId;

/**
 * 
 */
chrome.webRequest.onCompleted.addListener(
    function (details) {
        const parsedUrl = new URL(details.url);

        if (currentUrl && currentUrl.indexOf(parsedUrl.pathname) > -1 && tabId) {
            chrome.tabs.sendMessage(tabId, { type: MessageType.PAGE_RENDERED });
        }
    },
    { urls: ['*://*.github.com/*'] }
);

chrome.webNavigation.onHistoryStateUpdated.addListener(
    details => {
        tabId = details.tabId;
        currentUrl = details.url;
    },
    {
        url: [
            {
                hostSuffix: 'github.com'
            }
        ]
    }
);