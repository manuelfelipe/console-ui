export interface BaseRequest {
  params?: { [key: string]: any };
  queryParams?: { [key: string]: any };
  headers?: { [key: string]: any };
  body?: any;
}
