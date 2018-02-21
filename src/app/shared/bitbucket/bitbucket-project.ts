export interface BitbucketProjectsResponse {
  size: number;
  limit: number;
  isLastPage: boolean;
  start: number;
  values: BitbucketProject[];
}

export interface BitbucketProject {
  key: string;
  name: string;
}
