export interface IFeatureEvent {
    type: "feature",
    treeviewId: number,
    ids: number[]
}

export interface ILoadEvent {
    type: "load",
    url: string
}

export type IEvent = ILoadEvent | IFeatureEvent;