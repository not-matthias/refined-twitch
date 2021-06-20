import * as hideSideNavigation from "./hide-side-navigation";

export type FeatureCallback = () => Promise<void>;

export interface IFeatureList {
    hideSideNavigation: FeatureCallback
}

export interface IFeature {
    name: () => Promise<void>;
}

export async function getFeatures(): Promise<IFeatureList> {
    return {
        hideSideNavigation: hideSideNavigation.default
    };
}


export default {
    
}