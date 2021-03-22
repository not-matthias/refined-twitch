console.log(`Content ${new Date().toString()}`)

// Side bar
//
// const sidebar = document.querySelector("#sideNav");
// sidebar?.remove();

// Observe mutations
//

// https://stackoverflow.com/a/57395241
const observer = new MutationObserver(() => {

    // Front Page Carousel
    //
    const frontPage = document.querySelector(".front-page-carousel");
    frontPage?.remove();

    // Dynamic Content below the Carousel
    //
    document.querySelectorAll(".find-me").forEach((div: Element) => {
        const element = div as HTMLElement;

        // 'Live channels we think you’ll like'
        //
        if ((element as HTMLElement).innerText.startsWith("Live channels")) {
            element.remove();
        }
    });

    // observer.disconnect();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
