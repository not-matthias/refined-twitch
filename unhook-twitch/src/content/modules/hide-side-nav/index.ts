class HideSideNavModule {
    constructor() {
        // settings.add({
        //   id: 'hideBits',
        //   name: 'Hide Bits',
        //   defaultValue: false,
        //   description: "Disables bits in chat (we can't block 'em on stream, sry)",
        // });
        // settings.on('changed.hideBits', () => this.load());
        this.load();
      }
    
      load() {
        // $('body').toggleClass('bttv-hide-bits', settings.get('hideBits'));
      }
}