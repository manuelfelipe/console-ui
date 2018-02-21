export interface DowntimeSearch {
  category: string;
  kind: string;
  namespace?: string;
  since: number;
  to: number;
}
