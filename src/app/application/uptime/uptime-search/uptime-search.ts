import { UptimeInterval } from '../../../shared/uptime/uptime-interval';

export interface UptimeSearch {
  category: string;
  kind: string;
  namespace?: string;
  interval: UptimeInterval;
  since: number;
  to: number;
}
