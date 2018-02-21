export interface ConsumerResponse {
  id: string;
  username?: string; // either username or custom_id is required
  custom_id?: string; // either username or custom_id is required
  created_at: number;
}
