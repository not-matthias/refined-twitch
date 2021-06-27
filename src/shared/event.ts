export interface IFeatureEvent {
    type: "feature",
    ids: number[]
}

export interface ILoadEvent {
    type: "load",
    url: string
}

export type IEvent = ILoadEvent | IFeatureEvent;