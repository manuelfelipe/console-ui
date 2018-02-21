export interface PluginResponse {
  id: string;
  api_id?: string;
  consumer_id?: string;
  name: string;
  config: any;
  enabled: boolean;
  created_at: number;
}
