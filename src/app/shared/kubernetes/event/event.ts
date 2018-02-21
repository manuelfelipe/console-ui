export interface Event {
  reason: string;
  message: string;
  uid: string;
  creationTimestamp: Date;
  firstTimestamp: Date;
  lastTimestamp: Date;
  count: number;
  type: EventType;
}

export enum EventType {
  Normal,
  Warning,
}
