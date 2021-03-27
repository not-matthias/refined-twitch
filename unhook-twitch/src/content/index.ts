import { IEvent, IEventType } from "@/shared/event";
import { ConfigIds, loadConfig } from "@/shared/config";

console.log(`Content ${new Date().toString()}`)

// Hide/Show all elements when loading the website
//
function initialize() {
    loadConfig().then(config => {
        const handle = setInterval(() => {
            const result = handleEvents({
                event_type: IEventType.Added,
                ids: config.generalItems.concat(config.streamItems).concat(config.miscItems)
            } as IEvent);

            // Clear the interval or retry otherwise
            //
            if (result) {
                clearInterval(handle);
            }
        }, 100);
    });
}

initialize();

// Set the event handler
//

/**
 * Finds the element for the specified settings.
 * @param id
 */
function getElement(id: number): HTMLElement | null | undefined {
    switch (id) {
        // === General Config ===
        //

        // Left Sidebar
        //
        case ConfigIds.FOLLOWED_CHANNELS:
            return document.querySelectorAll("#sideNav .side-nav-section")[0] as HTMLElement;

        case ConfigIds.RECOMMENDED_CHANNELS:
            return document.querySelectorAll("#sideNav .side-nav-section")[1] as HTMLElement;

        // TODO: Online Friends
        // TODO: Side Info Container

        // Header
        //
        case ConfigIds.FOLLOWING:
            return [...document.querySelectorAll(".navigation-link")].find(value => value.getAttribute("data-a-target") == "following-link") as HTMLElement;

        case ConfigIds.BROWSE:
            return [...document.querySelectorAll(".navigation-link")].find(value => value.getAttribute("data-a-target") == "browse-link") as HTMLElement;

        case ConfigIds.PRIME_GAMING_LOOT:
            return document.querySelector(".prime-offers") as HTMLElement;

        case ConfigIds.NOTIFICATIONS:
            return document.querySelector(".onsite-notifications") as HTMLElement;

        // === Stream Config ===
        //

        // Chat
        //
        case ConfigIds.CHAT_WINDOW:
            return document.querySelector(".chat-shell .stream-chat") as HTMLElement;

        case ConfigIds.POLLS: {
            // TODO
            break;
        }

        case ConfigIds.BETS: {
            // TODO
            break;
        }

        // Information
        //
        case ConfigIds.VIEWER_COUNT: {
            const element = [...document.querySelectorAll(".tw-c-text-live")].find(value => value.getAttribute("data-a-target") == "animated-channel-viewers-count") as HTMLElement;
            return element?.parentElement;
        }

        case ConfigIds.LIVE_TIME:
            return document.querySelector(".live-time") as HTMLElement;

        // Actions
        //
        case ConfigIds.FOLLOW: {
            const element = [...document.querySelectorAll(".tw-core-button")].find(value => value.getAttribute("data-a-target") == "follow-button") as HTMLElement;
            return element?.parentElement;
        }

        case ConfigIds.SUBSCRIBE: {
            const element = [...document.querySelectorAll(".tw-core-button")].find(value => value.getAttribute("data-a-target") == "subscribe-button") as HTMLElement;
            return element?.parentElement;
        }

        // Description
        //
        case ConfigIds.STREAM_DESCRIPTION:
            return [...document.querySelectorAll("h2")].find(value => value.getAttribute("data-a-target") == "stream-title") as HTMLElement;

        case ConfigIds.METADATA:
            {
                const element = [...document.querySelectorAll(".tw-link")].find(value => value.getAttribute("data-a-target") == "stream-game-link") as HTMLElement;
                return element?.parentElement?.parentElement;
            }

        // Other
        //
        case ConfigIds.SOCIAL_MEDIA:
            return document.querySelector(".social-media-space") as HTMLElement;

        case ConfigIds.CHANNEL_PANEL:
            return document.querySelector(".channel-panels") as HTMLElement;

        case ConfigIds.EXTENSIONS:
            return document.querySelector(".tw-c-text-overlay") as HTMLElement;
    }
}

/**
 * Handles all the added/removed events and acts upon it.
 * @param request
 * @returns False if an element could not be found. It is recommended to call this function again after a while so that the element could get loaded.
 */
function handleEvents(request: IEvent): boolean {
    console.log("addListener");

    for (const id of request.ids) {
        const element = getElement(id);

        // Hide or show the element
        //
        if (element) {
            element.style.cssText = request.event_type == IEventType.Added ? "display: none !important" : "";
        } else {
            return false;
        }
    }

    return true;
}

chrome.runtime.onMessage.addListener(handleEvents);

// Observe mutations: 
//
// Listen for changes and hide all the enabled features. This is needed when switching to another stream,
// because the elements will be loaded again and thus circumvent the initial initilization.
//
const observer = new MutationObserver(() => {
    initialize();
});

observer.observe(document.body, {
    childList: true
});


// Only hide messages: .scrollable-area __web-inspector-hide-shortcut__
//      data-a-target="chat-scroller"


// Hide entire chat room (also hides the 'Send' message button): 
//      class="chat-room__content tw-c-text-base tw-flex tw-flex-column tw-flex-grow-1 tw-flex-nowrap tw-full-height tw-relative"
//      data-test-selector="chat-room-component-layout"
// => Also hides a lot of other stuff (polls, users list, ...)


// Hide the entire channel info: `class="channel-info-content"/div[1]`

// Hide viewer count: data-a-target="animated-channel-viewers-count"


// Hide Extensions: class="extensions-video-overlay-size-container" 
//      class="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-top-0 video-player__overlay __web-inspector-hide-shortcut__"

// Hype train: .community-highlight
// Gifted Subs Leaderboard: .channel-leaderboard