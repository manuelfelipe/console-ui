export interface DowntimeResponse {
  _id: string;
  _id_uptime: string;
  down_start_date: number;
  down_end_date: number;
  extra: {
    status_code: number;
    text: string;
  };
}
