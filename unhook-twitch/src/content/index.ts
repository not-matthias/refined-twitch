import { DEFAULT_CONFIG, IConfig, loadConfig } from "@/shared/config";

console.log(`Content ${new Date().toString()}`)


let cachedConfig: IConfig | undefined = undefined;
loadConfig().then((value) => {
    cachedConfig = value;
})

chrome.storage.onChanged.addListener((changes, namespace) => {
    for (const key in changes) {
        console.log(changes[key].newValue);

    }
});

// Side bar
//
// const sidebar = document.querySelector("#sideNav");
// sidebar?.remove();

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