import { EventResponse } from './event-response';

/* tslint:disable */
export const KUBERNETES_EVENTS: EventResponse[] = [
  {
    "metadata": {
      "name": "status-develop-2010956537-8629q.14d050dbdcb3f78c",
      "namespace": "status-develop",
      "selfLink": "/api/v1/namespaces/status-develop/events/status-develop-2010956537-8629q.14d050dbdcb3f78c",
      "uid": "27a1f742-664f-11e7-bc47-0e140e5a62e6",
      "resourceVersion": "85758483",
      "creationTimestamp": "2017-07-11T15:39:41Z"
    },
    "involvedObject": {
      "kind": "Pod",
      "namespace": "status-develop",
      "name": "status-develop-2010956537-8629q",
      "uid": "074df9c9-625e-11e7-9f20-120cfb3875d4",
      "apiVersion": "v1",
      "resourceVersion": "137537608"
    },
    "reason": "FailedScheduling",
    "message": "No nodes are available that match all of the following predicates:: Insufficient cpu (1), MatchNodeSelector (15).",
    "source": {
      "component": "default-scheduler"
    },
    "firstTimestamp": "2017-07-11T15:39:41Z",
    "lastTimestamp": "2017-07-11T17:36:33Z",
    "count": 354,
    "type": "Warning"
  },
  {
    "metadata": {
      "name": "status-develop.14d057347cbb36ec",
      "namespace": "status-develop",
      "selfLink": "/api/v1/namespaces/status-develop/events/status-develop.14d057347cbb36ec",
      "uid": "70fefcd8-665f-11e7-98a4-0a488c45c1d2",
      "resourceVersion": "85758292",
      "creationTimestamp": "2017-07-11T17:36:16Z"
    },
    "involvedObject": {
      "kind": "Ingress",
      "namespace": "status-develop",
      "name": "status-develop",
      "uid": "d37bc91b-b026-11e6-b7b3-12edb872dcf8",
      "apiVersion": "extensions",
      "resourceVersion": "137204526"
    },
    "reason": "CREATE",
    "message": "status-develop/status-develop",
    "source": {
      "component": "dns-controller"
    },
    "firstTimestamp": "2017-07-11T17:35:58Z",
    "lastTimestamp": "2017-07-11T17:35:58Z",
    "count": 1,
    "type": "Normal"
  }
];
