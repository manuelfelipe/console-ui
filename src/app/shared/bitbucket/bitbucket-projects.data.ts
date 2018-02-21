import { BitbucketProjectsResponse } from './bitbucket-project';

export const BITBUCKET_PROJECTS_RESPONSE: BitbucketProjectsResponse = {
  size: 2,
  limit: 1000,
  isLastPage: true,
  start: 0,
  values: [
    {
      key: 'CLOUD',
      name: 'CLOUD',
    },
    {
      key: 'POR',
      name: 'Portal',
    }
  ],
};
