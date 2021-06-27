import $ from 'jquery';
import logger from "@/content/utils/logger"
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { waitForElement } from '@/content/utils/dom';
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
  }

  hideFollowedChannels() {
    settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((enabled) => {
      waitForElement("#sideNav .side-nav-section:nth-child(1)").then((element) => {
        $(element).attr("style", enabled ? "display: none !important" : "");
      });
    });
  }

  hideRecommendedChannels() {
    settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((enabled) => {
      waitForElement("#sideNav .side-nav-section:nth-child(2)").then((element) => {
        $(element).attr("style", enabled ? "display: none !important" : "");
      });
    });
  }
}


export default new HideSideNavModule();