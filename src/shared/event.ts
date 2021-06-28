export interface IFeatureEvent {
    type: "feature",
    treeviewId: number,
    ids: number[]
}

export interface ILoadEvent {
    type: "load",
    url: string
}

export interface IExtensionStatusEvent {
    type: "extension",
    enabled: boolean
}

export type IEvent = ILoadEvent | IFeatureEvent | IExtensionStatusEvent;