import { BitbucketRepositoriesResponse } from './bitbucket-repository';

export const BITBUCKET_REPOSITORIES_RESPONSE: BitbucketRepositoriesResponse = {
  size: 2,
  limit: 1000,
  isLastPage: true,
  start: 0,
  values: [
    {
      slug: 'console-server',
      name: 'Console-Server',
    },
    {
      slug: 'console-ui',
      name: 'Console-UI',
    }
  ],
};
