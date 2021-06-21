import $ from 'jquery';
import logger from "@/content/utils/logger"
import settings from '@/content/settings';

class HideSideNavModule {
  constructor() {
    // settings.add({
    //   id: 'hideBits',
    //   name: 'Hide Bits',
    //   defaultValue: false,
    //   description: "Disables bits in chat (we can't block 'em on stream, sry)",
    // });
    settings.on("changed.hide-nav", () => this.load());
    this.load();
  }

  async load() {
    console.log("load");

    await settings.set("hide-nav", true);
    await settings.set("test2", false);
    await settings.set("test3", true);
    await settings.set("test4", false);
    console.log(await settings.get("test1"));
    console.log(await settings.get("test2"));
    console.log(await settings.get("test3"));
    console.log(await settings.get("test4"));

    logger.info("HideSideNavModule load");
    $("body").toggleClass("custom-css-rule", true);
    // $('body').toggleClass('bttv-hide-bits', settings.get('hideBits'));
  }
}


export default new HideSideNavModule();