import { WatchEventResponse } from './watch-event-response';
import { PodResponse } from '../pod/pod-response';
import { KUBERNETES_PODS } from '../pod/pods.data';

export const WATCH_EVENT_ADDED_RESPONSE: WatchEventResponse<PodResponse> = {
  type: 'ADDED',
  data: KUBERNETES_PODS[0],
};

export const WATCH_EVENT_MODIFIED_RESPONSE: WatchEventResponse<PodResponse> = {
  type: 'MODIFIED',
  data: KUBERNETES_PODS[0],
};

export const WATCH_EVENT_DELETED_RESPONSE: WatchEventResponse<PodResponse> = {
  type: 'DELETED',
  data: KUBERNETES_PODS[0],
};
