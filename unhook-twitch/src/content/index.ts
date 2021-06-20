import domLoaded from 'dom-loaded';
import { EsModuleComponent } from 'vue/types/options';
import "./features/testing"

function onRouteChange(callback: () => void) {
    const observer = new MutationObserver(callback);
    observer.observe(document.body, { attributes: true });
}

async function init() {
    console.log("init");

    // const features = await getFeatures();

    // onRouteChange(() => {
    // loadFeature(features.hideSideNavigation);
    // });
}


(async (currentScript) => {
    console.log("started");
    
}
)(document.currentScript);
