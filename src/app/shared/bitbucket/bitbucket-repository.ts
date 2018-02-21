export interface BitbucketRepositoriesResponse {
  size: number;
  limit: number;
  isLastPage: boolean;
  start: number;
  values: BitbucketRepository[];
}

export interface BitbucketRepository {
  slug: string;
  name: string;
}
