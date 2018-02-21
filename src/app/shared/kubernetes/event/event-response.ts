export interface EventResponse {
  metadata: {
    name: string;
    namespace: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
  };
  involvedObject: {
    kind: string;
    namespace: string;
    name: string;
    uid: string;
    apiVersion: string;
    resourceVersion: string;
  };
  reason: string;
  message: string;
  source: {
    component: string;
  };
  firstTimestamp: string;
  lastTimestamp: string;
  count: number;
  type: string;
}
