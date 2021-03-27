import { IEvent, IEventType } from "@/shared/event";
import { ConfigIds } from "@/shared/config";

console.log(`Content ${new Date().toString()}`)

// chrome.storage.onChanged.addListener((changes) => {
//     for (const key in changes) {
//         console.log(changes[key].newValue);
//     }
// });

chrome.runtime.onMessage.addListener((request: IEvent) => {
    console.log("addListener");

    const displayStyle = request.event_type == IEventType.Added ? "display: none !important" : "";
    for (const id of request.ids) {
        switch (id) {
            // === General Config ===
            //

            // Left Sidebar
            //
            case ConfigIds.FOLLOWED_CHANNELS:
                {
                    const sidebar = document.querySelector("#sideNav .side-nav-section") as HTMLElement;
                    sidebar.style.cssText = displayStyle;
                    break;
                }

            case ConfigIds.RECOMMENDED_CHANNELS:
                {
                    const sidebar = document.querySelectorAll("#sideNav .side-nav-section")[1] as HTMLElement;
                    sidebar.style.cssText = displayStyle;
                    break;
                }

            // TODO: Online Friends
            // TODO: Side Info Container

            // Header
            //
            case ConfigIds.FOLLOWING:
                break;
            case ConfigIds.BROWSE:
                break;
            case ConfigIds.PRIME_GAMING_LOOT:
                break;
            case ConfigIds.NOTIFICATIONS:
                break;


            // === Stream Config ===
            //

            // Chat
            //
            case ConfigIds.CHAT_WINDOW:
                break;
            case ConfigIds.POLLS:
                break;
            case ConfigIds.BETS:
                break;

            // Information
            //
            case ConfigIds.VIEWER_COUNT:
                break;
            case ConfigIds.LIVE_TIME:
                break;

            // Actions
            //
            case ConfigIds.FOLLOW:
                break;
            case ConfigIds.SUBSCRIBE:
                break;

            // Description
            //
            case ConfigIds.STREAM_DESCRIPTION:
                break;
            case ConfigIds.METADATA:
                break;

            // Other
            //
            case ConfigIds.SOCIAL_MEDIA:
                break;
            case ConfigIds.CHANNEL_PANEL:
                break;
            case ConfigIds.EXTENSIONS:
                break;
        }
    }
});

// Side bar
//

// Observe mutations
//

// https://stackoverflow.com/a/57395241
const observer = new MutationObserver(() => {

    // Front Page Carousel
    //
    const frontPage = document.querySelector(".front-page-carousel");
    frontPage?.remove();

    // Dynamic Content below the Carousel
    //
    document.querySelectorAll(".find-me").forEach((div: Element) => {
        const element = div as HTMLElement;

        // 'Live channels we think you’ll like'
        //
        if ((element as HTMLElement).innerText.startsWith("Live channels")) {
            element.remove();
        }
    });

    // observer.disconnect();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

// Hide Chat
//
// .channel-root__right-column .channel-root__right-column--expanded

// Only hide messages: .scrollable-area __web-inspector-hide-shortcut__
//      data-a-target="chat-scroller"


// Hide entire chat room (also hides the 'Send' message button): 
//      class="chat-room__content tw-c-text-base tw-flex tw-flex-column tw-flex-grow-1 tw-flex-nowrap tw-full-height tw-relative"
//      data-test-selector="chat-room-component-layout"
// => Also hides a lot of other stuff (polls, users list, ...)


// Hide social media space: 
//      class="social-media-space tw-full-width"


// Hide channel panels: 
//      class="channel-panels"


// Hide the entire channel info: `class="channel-info-content"/div[1]`

// Hide viewer count: data-a-target="animated-channel-viewers-count"


// Hide Extensions: class="extensions-video-overlay-size-container" 
//      class="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-top-0 video-player__overlay __web-inspector-hide-shortcut__"