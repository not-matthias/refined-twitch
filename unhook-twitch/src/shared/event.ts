export enum IEventType {
    Enabled,
    Disabled
}

export interface IEvent {
    event_type: IEventType;
    ids: number[]
}