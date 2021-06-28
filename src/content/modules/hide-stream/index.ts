import $ from 'jquery';
import logger from "@/content/utils/logger"
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { waitForElement } from '@/content/utils/dom';
import siteLoad from '@/content/watcher/site-load';

class HideStreamModule {
    constructor() {
        settings.on(`changed.${ConfigIds.CHAT_WINDOW}`, () => this.hideChat());
        settings.on(`changed.${ConfigIds.CHANNEL_LEADERBOARD}`, () => this.hideLeaderboard());
        settings.on(`changed.${ConfigIds.POLLS}`, () => this.hidePolls());
        settings.on(`changed.${ConfigIds.BETS}`, () => this.hideBets());
        settings.on(`changed.${ConfigIds.VIEWER_COUNT}`, () => this.hideViewerCount());
        settings.on(`changed.${ConfigIds.LIVE_TIME}`, () => this.hideLiveTime());
        settings.on(`changed.${ConfigIds.FOLLOW}`, () => this.hideFollow());
        settings.on(`changed.${ConfigIds.SUBSCRIBE}`, () => this.hideSubscribe());
        settings.on(`changed.${ConfigIds.STREAM_DESCRIPTION}`, () => this.hideStreamDescription());
        settings.on(`changed.${ConfigIds.METADATA}`, () => this.hideStreamMetadata());
        settings.on(`changed.${ConfigIds.SOCIAL_MEDIA}`, () => this.hideSocialMedia());
        settings.on(`changed.${ConfigIds.CHANNEL_PANEL}`, () => this.hideChannelPanel());
        settings.on(`changed.${ConfigIds.EXTENSIONS}`, () => this.hideExtensions());

        siteLoad.onLoaded(() => this.onLoaded());
        this.onLoaded();
    }

    onLoaded() {
        this.hideChat();
        this.hideLeaderboard();
        this.hidePolls();
        this.hideBets();
        this.hideViewerCount();
        this.hideLiveTime();
        this.hideFollow();
        this.hideSubscribe();
        this.hideStreamDescription();
        this.hideStreamMetadata();
        this.hideSocialMedia();
        this.hideChannelPanel();
        this.hideExtensions();
    }

    hideChat() {
        settings.get(ConfigIds.CHAT_WINDOW.toString()).then((enabled) => {
            waitForElement(".chat-shell .stream-chat").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideLeaderboard() {
        settings.get(ConfigIds.CHANNEL_LEADERBOARD.toString()).then((enabled) => {
            waitForElement(".channel-leaderboard").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hidePolls() {
        // TODO: Implement
    }

    hideBets() {
        // TODO: Implement
    }

    hideViewerCount() {
        settings.get(ConfigIds.VIEWER_COUNT.toString()).then((enabled) => {
            waitForElement("p[data-a-target='animated-channel-viewers-count']").then((element) => {
                if (element?.parentElement) {
                    $(element?.parentElement).attr("style", enabled ? "display: none !important" : "");
                }
            });
        });
    }

    hideLiveTime() {
        settings.get(ConfigIds.LIVE_TIME.toString()).then((enabled) => {
            waitForElement(".live-time").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideFollow() {
        settings.get(ConfigIds.FOLLOW.toString()).then((enabled) => {
            waitForElement('button[data-a-target="follow-button"]').then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideSubscribe() {
        settings.get(ConfigIds.SUBSCRIBE.toString()).then((enabled) => {
            waitForElement('button[data-a-target="subscribe-button"]').then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideStreamDescription() {
        settings.get(ConfigIds.STREAM_DESCRIPTION.toString()).then((enabled) => {
            waitForElement('h2[data-a-target="stream-title"]').then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideStreamMetadata() {
        settings.get(ConfigIds.METADATA.toString()).then((enabled) => {
            waitForElement('a[data-a-target="stream-game-link"]').then((element) => {
                if (element?.parentElement?.parentElement) {
                    $(element?.parentElement?.parentElement).attr("style", enabled ? "display: none !important" : "");
                }
            });
        });
    }

    hideSocialMedia() {
        settings.get(ConfigIds.SOCIAL_MEDIA.toString()).then((enabled) => {
            waitForElement(".social-media-space").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideChannelPanel() {
        settings.get(ConfigIds.CHANNEL_PANEL.toString()).then((enabled) => {
            waitForElement(".channel-panels").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }

    hideExtensions() {
        settings.get(ConfigIds.EXTENSIONS.toString()).then((enabled) => {
            waitForElement(".video-player__overlay .tw-c-text-overlay").then((element) => {
                $(element).attr("style", enabled ? "display: none !important" : "");
            });
        });
    }
}


export default new HideStreamModule();