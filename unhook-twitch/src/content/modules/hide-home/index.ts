import $ from 'jquery';
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { useClass, waitForElement } from '@/content/utils/dom';
import siteLoad from '@/content/watcher/site-load';

class HideHomeModule {
    constructor() {
        settings.on(`changed.${ConfigIds.FRONT_PAGE_CAROUSEL}`, () => this.hideCarousel());
        settings.on(`changed.${ConfigIds.RECOMMENDED_STREAMS}`, () => this.hideRecommendedStreams());
        settings.on(`changed.${ConfigIds.RECOMMENDED_CATEGORIES}`, () => this.hideRecommendedCategories());
        settings.on(`changed.${ConfigIds.RECOMMENDED_CLIPS}`, () => this.hideRecommendedClips());

        siteLoad.onLoaded(() => this.onLoaded());
        this.onLoaded();
    }

    onLoaded() {
        this.hideCarousel();
        this.hideRecommendedStreams();
        this.hideRecommendedCategories();
        this.hideRecommendedClips();
    }

    hideCarousel() {
        settings.get(ConfigIds.FRONT_PAGE_CAROUSEL.toString()).then((value) => {
            // Always pause the video
            //
            waitForElement(".front-page-carousel button[data-a-target=\"player-play-pause-button\"]").then(element => {
                if ($(element).attr("data-a-player-state") == "playing") {
                    (element as HTMLButtonElement).click();
                }
            });

            useClass("unlock-twitch-hide-carousel", value);
        });
    }

    hideRecommendedStreams() {
        settings.get(ConfigIds.RECOMMENDED_STREAMS.toString()).then(enabled => {
            // `/<channel_name>`
            this.hidePanel(enabled, "/", "preview-card-image-link");
        });
    }

    hideRecommendedCategories() {
        settings.get(ConfigIds.RECOMMENDED_CATEGORIES.toString()).then(enabled => {
            this.hidePanel(enabled, "/directory", "card-");
        });
    }

    hideRecommendedClips() {
        settings.get(ConfigIds.RECOMMENDED_CLIPS.toString()).then(enabled => {
            this.hidePanel(enabled, "https://clips.twitch.tv", "preview-card-image-link");
        });
    }

    /**
     * Hides a certain panel based on the link style.
     * @param enabled whether the panel should be hidden or visible
     * @param dataATargetValue the value that the `data-a-target` attribute for the link has to start with
     * @param linkContent the content that the link has to start with
     */
    hidePanel(enabled: boolean, linkContent: string, dataATargetValue: string) {
        waitForElement(".common-centered-column .find-me").then(() => {
            [...document.querySelectorAll(".common-centered-column .find-me")]
                .forEach(item => {
                    for (const link of item.querySelectorAll(".tw-link")) {
                        if (link?.getAttribute("data-a-target")?.startsWith(dataATargetValue) && (link as HTMLLinkElement).getAttribute("href")?.startsWith(linkContent)) {
                            $(item).attr("style", enabled ? "display: none !important" : "display: block");
                        }
                    }
                });
        });
    }
}

export default new HideHomeModule();