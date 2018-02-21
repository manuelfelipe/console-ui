import { ApiResponse } from './api-response';

export const KONG_APIS: ApiResponse[] = [
  {
    created_at: 1488830759000,
    hosts: ['example.org'],
    uris: ['/health'],
    methods: ['Get', 'Post', 'Put', 'Patch', 'Delete'],
    http_if_terminated: true,
    https_only: false,
    id: '6378122c-a0a1-438d-a5c6-efabae9fb969',
    name: 'example-api',
    preserve_host: false,
    retries: 5,
    strip_uri: true,
    upstream_connect_timeout: 60000,
    upstream_read_timeout: 60000,
    upstream_send_timeout: 60000,
    upstream_url: 'http://httpbin.org'
  },
  {
    created_at: 1488830708000,
    hosts: ['api.com'],
    uris: ['/apis'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    http_if_terminated: true,
    https_only: false,
    id: '0924978e-eb19-44a0-9adc-55f20db2f04d',
    name: 'my-api',
    preserve_host: false,
    retries: 10,
    strip_uri: true,
    upstream_connect_timeout: 1000,
    upstream_read_timeout: 1000,
    upstream_send_timeout: 1000,
    upstream_url: 'http://my-api.com'
  }
];
