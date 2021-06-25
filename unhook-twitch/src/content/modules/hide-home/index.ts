import $ from 'jquery';
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { listenForElement, useClass, waitForElement, waitForElements } from '@/content/utils/dom';

class HideHeaderModule {
    constructor() {
        settings.on(`changed.${ConfigIds.FRONT_PAGE_CAROUSEL}`, () => this.hideCarousel());
        settings.on(`changed.${ConfigIds.RECOMMENDED_STREAMS}`, () => this.hideRecommendedStreams());
        settings.on(`changed.${ConfigIds.RECOMMENDED_CATEGORIES}`, () => this.hideRecommendedCategories());
        settings.on(`changed.${ConfigIds.RECOMMENDED_CLIPS}`, () => this.hideRecommendedClips());

        this.hideCarousel();
        this.hideRecommendedStreams();
        this.hideRecommendedCategories();
        this.hideRecommendedClips();

        listenForElement(".common-centered-column .find-me", () => console.log("element loaded"));
    }

    hideCarousel() {
        settings.get(ConfigIds.FRONT_PAGE_CAROUSEL.toString()).then((value) => {
            // Always pause the video
            //
            waitForElement("button[data-a-target=\"player-play-pause-button\"]").then(element => {
                if ($(element).attr("data-a-player-state") == "playing") {
                    (element as HTMLButtonElement).click();
                }
            });

            useClass("unlock-twitch-hide-carousel", value);
        });
    }

    hideRecommendedStreams() {
        settings.get(ConfigIds.RECOMMENDED_STREAMS.toString()).then(enabled => {

            waitForElements(".common-centered-column .find-me").then(() => {
                [...document.querySelectorAll(".common-centered-column .find-me")]
                    .forEach(item => {
                        for (const link of item.querySelectorAll(".tw-link")) {
                            // Streams start with `/<channel-name>`
                            //
                            if (link?.getAttribute("data-a-target") == "preview-card-image-link" && !(link as HTMLLinkElement).href.includes("clips.twitch.tv")) {
                                $(item).attr("style", enabled ? "display: none !important" : "");
                            }
                        }
                    });
            });
        });
    }

    hideRecommendedCategories() {
        settings.get(ConfigIds.RECOMMENDED_CATEGORIES.toString()).then((value) => useClass("unlock-twitch-hide-browse", value));

        // case ConfigIds.RECOMMENDED_CATEGORIES: {
        //     const categoryGrid = document.querySelector(".common-centered-column .tw-mg-b-1") as HTMLElement;
        //     const element = [...document.querySelectorAll(".common-centered-column .find-me")].find(value => value.querySelector(".tw-link")?.getAttribute("href") == "/directory") as HTMLElement;

        //     return [categoryGrid, element];
        // }

    }

    hideRecommendedClips() {
        settings.get(ConfigIds.RECOMMENDED_CLIPS.toString()).then((value) => useClass("unlock-twitch-hide-notifications", value));

        // case ConfigIds.RECOMMENDED_CLIPS: {
        //     const element = [...document.querySelectorAll(".common-centered-column .find-me")]
        //         .find(item => {
        //             for (const link of item.querySelectorAll(".tw-link")) {
        //                 if (link?.getAttribute("data-a-target") == "preview-card-image-link" && (link as HTMLLinkElement).href.includes("clips.twitch.tv")) {
        //                     return true;
        //                 }
        //             }
        //         });

        //     return element as HTMLElement;
        // }
    }

}


export default new HideHeaderModule();