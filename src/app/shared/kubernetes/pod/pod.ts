import { PodStatus } from './pod-status';
import { PodLastState } from './pod-last-state';
import { ContainerState } from './container-state';

export interface Pod {
  name: string;
  namespace: string;
  uid: string;
  createdAt: Date;
  buildNumber: number;
  restartCount: number;
  status: PodStatus;
  containers: string[];
  containerState: ContainerState;
  lastState: PodLastState;
}
