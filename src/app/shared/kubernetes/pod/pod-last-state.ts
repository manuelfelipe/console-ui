import { PodStateRunning } from './pod-state-running';
import { PodStateTerminated } from './pod-state-terminated';
import { PodStateWaiting } from './pod-state-waiting';

export interface PodLastState {
  running?: PodStateRunning;
  terminated?: PodStateTerminated;
  waiting?: PodStateWaiting;
}
