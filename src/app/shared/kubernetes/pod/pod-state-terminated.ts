export interface PodStateTerminated {
  exitCode?: number;
  startedAt?: string;
  finishedAt?: string;
  message?: string;
  reason?: string;
  signal?: number;
}
