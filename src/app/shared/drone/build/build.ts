import { BuildEvent } from './build-event';
import { BuildStatus } from './build-status';

export interface Build {
  id: number;
  number: number;
  event: BuildEvent;
  status: BuildStatus;
  createdAt: Date;
  finishedAt: Date;
  branch: string;
  message: string;
  author: string;
  authorEmail: string;
  authorAvatar: string;
  linkUrl: string;
}
