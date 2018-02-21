import { includes, toLower } from 'lodash';
import { UptimeService } from './uptime-service';

export const daysToSeconds = (days: number): number => {
  return days ? days * 24 * 60 * 60 : 0;
};

export const getUptimesStatusSeverity = (uptimes: UptimeService[]): UptimeSeverity => {
  let severity: UptimeSeverity = 'success';

  // if no uptimes, just return `success`
  if (!uptimes) {
    return severity;
  }

  for (let i = 0; i < uptimes.length; ++i) {
    const uptime = uptimes[i];

    // 1 = service down
    if (uptime.status_public === 1) {
      // if prod service, return `danger` immediately
      if (includes(toLower(uptime.description), 'prod') || toLower(uptime.kind) === 'kubernetes') {
        return 'danger';
      } else {
        // if dev/qa/staging/whatever service, just a `warning`;
        severity = 'warning';
      }
    }
  }

  return severity;
};

export type UptimeSeverity = 'success' | 'warning' | 'danger';
