import { get } from 'lodash';
import { Uptime } from './uptime';
import { UptimeResponse } from './uptime-response';
import { DowntimeResponse } from './downtime-response';
import { Downtime } from './downtime';

export class UptimeResponseFactory {
  toUptime(uptimeResponse: UptimeResponse): Uptime {
    if (!uptimeResponse) {
      return null;
    }

    return {
      id: uptimeResponse._id,
      uptimeId: uptimeResponse._id_uptime,
      date: new Date(uptimeResponse.date * 1000),
      label: uptimeResponse.label,
      sla: uptimeResponse.sla,
      description: uptimeResponse.description,
    };
  };

  toUptimes(uptimes: UptimeResponse[]): Uptime[] {
    if (!uptimes) {
      return [];
    }

    return uptimes.map(uptime => this.toUptime(uptime));
  };

  toDowntime(downtimeResponse: DowntimeResponse): Downtime {
    if (!downtimeResponse) {
      return null;
    }

    return {
      id: downtimeResponse._id,
      uptimeId: downtimeResponse._id_uptime,
      downStartDate: new Date(downtimeResponse.down_start_date * 1000),
      // if 0, consider until now
      downEndDate: (downtimeResponse.down_end_date === 0) ? new Date() : new Date(downtimeResponse.down_end_date * 1000),
      extra: {
        statusCode: get<number>(downtimeResponse, 'extra.status_code'),
        text: get<string>(downtimeResponse, 'extra.text'),
      },
    };
  };

  toDowntimes(downtimes: DowntimeResponse[]): Downtime[] {
    if (!downtimes) {
      return [];
    }

    return downtimes.map(downtime => this.toDowntime(downtime));
  };
}
