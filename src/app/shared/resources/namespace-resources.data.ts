import { NamespaceResources } from './namespace-resources';

export const NAMESPACE_RESOURCES: NamespaceResources[] = [
  {
    cluster: 'gce',
    resources: [
      {
        type: 'memory',
        data: {
          metrics: [
            {
              timestamp: '2017-05-23T19:08:00Z',
              value: 439648256
            },
            {
              timestamp: '2017-05-23T19:09:00Z',
              value: 445177856
            },
            {
              timestamp: '2017-05-23T19:10:00Z',
              value: 449527808
            }
          ],
          latestTimestamp: '2017-05-23T19:10:00Z'
        }
      },
      {
        type: 'cpu',
        data: {
          metrics: [
            {
              timestamp: '2017-05-23T19:08:00Z',
              value: 1518
            },
            {
              timestamp: '2017-05-23T19:09:00Z',
              value: 1528
            },
            {
              timestamp: '2017-05-23T19:10:00Z',
              value: 1519
            }
          ],
          latestTimestamp: '2017-05-23T19:10:00Z'
        }
      }
    ]
  },
  {
    cluster: 'aws',
    resources: [
      {
        type: 'memory',
        data: {
          metrics: [
            {
              timestamp: '2017-05-23T19:08:00Z',
              value: 204541952
            },
            {
              timestamp: '2017-05-23T19:09:00Z',
              value: 206680064
            },
            {
              timestamp: '2017-05-23T19:10:00Z',
              value: 210239488
            }
          ],
          latestTimestamp: '2017-05-23T19:10:00Z'
        }
      },
      {
        type: 'cpu',
        data: {
          metrics: [
            {
              timestamp: '2017-05-23T19:08:00Z',
              value: 300
            },
            {
              timestamp: '2017-05-23T19:09:00Z',
              value: 294
            },
            {
              timestamp: '2017-05-23T19:10:00Z',
              value: 302
            }
          ],
          latestTimestamp: '2017-05-23T19:10:00Z'
        }
      }
    ]
  }
];
