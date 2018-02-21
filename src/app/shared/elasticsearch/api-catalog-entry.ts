export interface APICatalogEntry {
  '@timestamp': string;
  namespace: string;
  repo: {
    owner: string;
    name: string;
  };
  serviceGroup?: string;
  serviceName?: string;
  // JSON.stringified
  // we do not return it from
  // backend, we don't need it
  spec?: string;
  info?: {
    title?: string;
    description?: string;
  };
}
