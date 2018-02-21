export interface UptimeService {
  id: string;
  category: string;
  kind: string;
  description: string;
  status: 0 | 1; // 0 = up, 1 = down
  status_public?: 0 | 1; // 0 = up, 1 = down
}
