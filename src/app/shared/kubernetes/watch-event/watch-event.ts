// Events received from Kubernetes Watch stream
export interface WatchEvent<T> {
  type: WatchEventType;
  data: T;
}

export enum WatchEventType {
  'ADDED',
  'MODIFIED',
  'DELETED',
  'ERROR',
}
