import { MetricResponse } from './metric-response';

export const METRICS_RESPONSE: MetricResponse[] = [
  {
    _id: 'metric_id_1',
    type: 'deployments',
    value: '5975',
    date: '2017-05-10T16:09:02.488Z'
  },
  {
    _id: 'metric_id_2',
    type: 'pods_aws',
    value: '679',
    date: '2017-05-10T16:09:02.488Z'
  },
  {
    _id: 'metric_id_3',
    type: 'pods_gce',
    value: '78',
    date: '2017-05-10T16:09:02.488Z'
  },
  {
    _id: 'metric_id_4',
    type: 'developers',
    value: '104',
    date: '2017-05-10T16:09:02.488Z'
  },
  {
    _id: 'metric_id_5',
    type: 'users',
    value: '115',
    date: '2017-05-10T16:09:02.488Z'
  },
];
