import $ from 'jquery';
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { useClass, waitForElement } from '@/content/utils/dom';
import siteLoad from '@/content/watcher/site-load';

class HideHeaderModule {
    constructor() {
        settings.on(`changed.${ConfigIds.FOLLOWING}`, () => this.hideFollowing());
        settings.on(`changed.${ConfigIds.BROWSE}`, () => this.hideBrowse());
        settings.on(`changed.${ConfigIds.PRIME_GAMING_LOOT}`, () => this.hidePrimeGamingLoot());
        settings.on(`changed.${ConfigIds.NOTIFICATIONS}`, () => this.hideNotifications());

        siteLoad.onLoaded(() => this.onLoaded());
        this.onLoaded();
    }

    onLoaded() {
        this.hideFollowing();
        this.hideBrowse();
        this.hidePrimeGamingLoot();
        this.hideNotifications();
    }

    hideFollowing() {
        settings.get(ConfigIds.FOLLOWING.toString()).then((value) => useClass("unlock-twitch-hide-following", value));
    }

    hideBrowse() {
        settings.get(ConfigIds.BROWSE.toString()).then((value) => useClass("unlock-twitch-hide-browse", value));
    }

    hidePrimeGamingLoot() {
        settings.get(ConfigIds.PRIME_GAMING_LOOT.toString()).then((value) => useClass("unlock-twitch-hide-prime-offers", value));
    }

    hideNotifications() {
        settings.get(ConfigIds.NOTIFICATIONS.toString()).then((value) => useClass("unlock-twitch-hide-notifications", value));
    }
}


export default new HideHeaderModule();