import $ from 'jquery';
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { useClass, waitForElement } from '@/content/utils/dom';
import siteLoad from '@/content/watcher/site-load';

class HideHeaderModule {
    constructor() {
        settings.on(`changed.${ConfigIds.HEADER_LEFT}`, () => this.hideHeaderLeft());
        settings.on(`changed.${ConfigIds.HEADER_SEARCH}`, () => this.hideSearch());
        settings.on(`changed.${ConfigIds.HEADER_RIGHT}`, () => this.hideHeaderRight());

        siteLoad.onLoaded(() => this.onLoaded());
        this.onLoaded();
    }

    onLoaded() {
        this.hideHeaderLeft();
        this.hideSearch();
        this.hideHeaderRight();
    }

    hideHeaderLeft() {
        settings.get(ConfigIds.HEADER_LEFT.toString()).then((enabled) => {
            this.hideHeader(enabled, 1);
        });
    }

    hideSearch() {
        settings.get(ConfigIds.HEADER_SEARCH.toString()).then((enabled) => {
            this.hideHeader(enabled, 2);
        });
    }

    hideHeaderRight() {
        settings.get(ConfigIds.HEADER_RIGHT.toString()).then((enabled) => {
            this.hideHeader(enabled, 3);
        });
    }

    hideHeader(enabled: boolean, headerIndex: number) {
        waitForElement(`.top-nav__menu > div:nth-child(${headerIndex})`).then((element) => {
            $(element).attr("style", enabled ? "visibility: hidden !important;" : "visibility: visible");
        });
    }
}


export default new HideHeaderModule();