export enum IEventType {
    Added,
    Removed
}

export interface IEvent {
    event_type: IEventType;
    ids: number[]
}