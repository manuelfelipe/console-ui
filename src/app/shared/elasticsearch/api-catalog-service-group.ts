export interface APICatalogServiceGroupResponse {
  total: number;
  serviceGroups: APICatalogServiceGroup[];
}

export interface APICatalogServiceGroup {
  key: string;
  doc_count: number;
}
