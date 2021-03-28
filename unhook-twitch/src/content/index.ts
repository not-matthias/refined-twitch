import {IEvent, IEventType} from "@/shared/event";
import {ConfigIds, loadConfig} from "@/shared/config";

// Hide/Show all elements when loading the website
//
function initialize() {
    loadConfig().then(config => {
        // We cannot rerun this function, because some elements might only exist on certain pages. Because of that,
        // this function will probably fail most of the time.
        //
        const result = handleEvents({
            event_type: IEventType.Added,
            ids: config.generalItems.concat(config.streamItems).concat(config.miscItems)
        } as IEvent);

        if (result) {
            console.log("[unhook-twitch] Successfully handled the events.");
        } else {
            console.log("[unhook-twitch] Failed to handle the events.");
        }
    });
}

initialize();

// Set the event handler
//

/**
 * Finds the element for the specified settings.
 * @param id
 */
function getElement(id: number): HTMLElement | null | undefined | HTMLElement[] {
    switch (id) {
        // === General Config ===
        //

        // Left Sidebar
        //
        case ConfigIds.FOLLOWED_CHANNELS:
            return document.querySelectorAll("#sideNav .side-nav-section")[0] as HTMLElement;

        case ConfigIds.RECOMMENDED_CHANNELS:
            return document.querySelectorAll("#sideNav .side-nav-section")[1] as HTMLElement;

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

        // === Home Config ===
        //
            
        case ConfigIds.FRONT_PAGE_CAROUSEL:
            return document.querySelector(".front-page-carousel") as HTMLElement;

        case ConfigIds.RECOMMENDED_STREAMS: {
            const elements = [...document.querySelectorAll(".common-centered-column .find-me")]
                .filter(item => {
                    for (const link of item.querySelectorAll(".tw-link")) {
                        // Streams start with `/<channel-name>`
                        //
                        if (link?.getAttribute("data-a-target") == "preview-card-image-link" && !(link as HTMLLinkElement).href.includes("clips.twitch.tv")) {
                            return true;
                        }
                    }
                });

            return elements as HTMLElement[];
        }

        case ConfigIds.RECOMMENDED_CATEGORIES: {
            const categoryGrid = document.querySelector(".common-centered-column .tw-mg-b-1") as HTMLElement;
            const element = [...document.querySelectorAll(".common-centered-column .find-me")].find(value => value.querySelector(".tw-link")?.getAttribute("href") == "/directory") as HTMLElement;

            return [categoryGrid, element];
        }

        case ConfigIds.RECOMMENDED_CLIPS: {
            const element = [...document.querySelectorAll(".common-centered-column .find-me")]
                .find(item => {
                    for (const link of item.querySelectorAll(".tw-link")) {
                        if (link?.getAttribute("data-a-target") == "preview-card-image-link" && (link as HTMLLinkElement).href.includes("clips.twitch.tv")) {
                            return true;
                        }
                    }
                });

            return element as HTMLElement;
        }

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

        case ConfigIds.METADATA: {
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
            return document.querySelector(".video-player__overlay .tw-c-text-overlay") as HTMLElement;
    }
}

/**
 * Handles all the added/removed events and acts upon it.
 * @param request
 * @returns False if an element could not be found. It is recommended to call this function again after a while so that the element could get loaded.
 */
function handleEvents(request: IEvent): boolean {
    let status = true;
    for (const id of request.ids) {
        let elements: HTMLElement[] = [];

        const element = getElement(id);
        if (element) {
            // Set the elements list
            //
            if (element instanceof HTMLElement) {
                elements = [element];
            } else if (Array.isArray(element)) {
                elements = element;
            }

            // Hide or show the elements
            //
            for (const element of elements) {
                element.style.cssText = request.event_type == IEventType.Added ? "display: none !important" : "";
            }
        } else {
            status = false;
        }
    }

    return status;
}

chrome.runtime.onMessage.addListener(handleEvents);

// Observe mutations: 
//
// Listen for changes and hide all the enabled features. This is needed when switching to another stream,
// because the elements will be loaded again and thus circumvent the initial initialization.
//
const observer = new MutationObserver(() => {
    initialize();
});

observer.observe(document.body, {
    childList: true
});