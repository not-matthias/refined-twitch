import logger from "@/content/utils/logger"
import settings from '@/content/settings';
import { ConfigIds } from '@/shared/config';
import { useClass } from '@/content/utils/dom';

class HideSideNavModule {
  constructor() {
    // settings.add({
    //   id: 'hideBits',
    //   name: 'Hide Bits',
    //   defaultValue: false,
    //   description: "Disables bits in chat (we can't block 'em on stream, sry)",
    // });

    settings.on(`changed.${ConfigIds.FOLLOWED_CHANNELS}`, () => this.hideFollowedChannels());
    settings.on(`changed.${ConfigIds.RECOMMENDED_CHANNELS}`, () => this.hideRecommendedChannels());

    this.hideFollowedChannels();
    this.hideRecommendedChannels();
    this.hideSideNav();
  }

  hideFollowedChannels() {
    console.log("[hideFollowedChannels]");

    this.hideSideNav();
    settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((value) => useClass("unlock-twitch-hide-followed-channels ", value));
  }

  hideRecommendedChannels() {
    console.log("[hideRecommendedChannels]");

    this.hideSideNav();
    settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((value) => useClass("unlock-twitch-hide-recommended-channels ", value));
  }

  hideSideNav() {
    console.log("[hideSideNav]");

    settings.get(ConfigIds.FOLLOWED_CHANNELS.toString()).then((hideFollowedChannels) => {
      settings.get(ConfigIds.RECOMMENDED_CHANNELS.toString()).then((hideRecommedChannels) => {
        console.log(`hide-side-nav: hideFollowedChannels=${hideFollowedChannels} hideRecommedChannels=${hideRecommedChannels}`);
        
        useClass("unlock-twitch-hide-side-nav", hideFollowedChannels && hideRecommedChannels)
      });
    });
  }
}


export default new HideSideNavModule();