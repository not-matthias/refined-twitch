import $ from 'jquery';
import logger from "@/content/utils/logger"
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { useClass, waitForElement } from '@/content/utils/dom';
import siteLoad from '@/content/watcher/site-load';

class HideSideNavModule {
  constructor() {
    settings.on(`changed.${ConfigIds.FOLLOWED_CHANNELS}`, () => this.hideFollowedChannels());
    settings.on(`changed.${ConfigIds.RECOMMENDED_CHANNELS}`, () => this.hideRecommendedChannels());

    siteLoad.onLoaded(() => this.onLoaded());
    this.onLoaded();
  }

  onLoaded() {
    this.hideFollowedChannels();
    this.hideRecommendedChannels();
    this.hideSideNav();
  }

  hideFollowedChannels() {
    settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((enabled) => {
      waitForElement("#sideNav .side-nav-section:nth-child(1)").then((element) => {
        $(element).attr("style", enabled ? "display: none !important" : "");
      });
    });

    this.hideSideNav();
    // settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((value) => useClass("unlock-twitch-hide-followed-channels ", value));
  }

  hideRecommendedChannels() {
    settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((enabled) => {
      waitForElement("#sideNav .side-nav-section:nth-child(2)").then((element) => {
        $(element).attr("style", enabled ? "display: none !important" : "");
      });
    });

    this.hideSideNav();
    // settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((value) => useClass("unlock-twitch-hide-recommended-channels ", value));
  }

  hideSideNav() {
    settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((hideFollowedChannels) => {
      settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((hideRecommedChannels) => {
        useClass("unlock-twitch-hide-side-nav", hideFollowedChannels && hideRecommedChannels)
      });
    });
  }
}


export default new HideSideNavModule();