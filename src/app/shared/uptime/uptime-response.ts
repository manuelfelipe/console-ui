export interface UptimeResponse {
  _id: string;
  _id_uptime: string;
  date: number; // unix
  label: string;
  sla: number;
  description: string;
}
