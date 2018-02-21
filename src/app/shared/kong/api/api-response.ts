export interface ApiResponse {
  id: string;
  name: string;
  hosts?: string[];
  uris?: string[];
  methods?: string[];
  upstream_url: string;
  strip_uri?: boolean;
  preserve_host?: boolean;
  retries?: number;
  upstream_connect_timeout?: number;
  upstream_send_timeout?: number;
  upstream_read_timeout?: number;
  https_only?: boolean;
  http_if_terminated: boolean;
  created_at: number;
}
