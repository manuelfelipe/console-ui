import { DowntimeResponse } from './downtime-response';

export const DOWNTIMES_RESPONSE: DowntimeResponse[] = [
  {
    _id: '59d294bf750d192da0e6d146',
    _id_uptime: '59d27108750d192d0857609c',
    down_start_date: 1506816000,
    down_end_date: 1506823200,
    extra: {
      status_code: 500,
      text: 'User did something he shouldn\'t have',
    },
  },
  {
    _id: '59d294c4750d192da0e6d147',
    _id_uptime: '59d27108750d192d0857609c',
    down_start_date: 1506902400,
    down_end_date: 1506945600,
    extra: {
      status_code: 500,
      text: 'User did something he shouldn\'t have... again',
    },
  }
];
