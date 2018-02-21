export interface BuildResponse {
  id: number;
  number: number;
  event: string;
  status: string;
  enqueued_at: number;
  created_at: number;
  started_at: number;
  finished_at: number;
  deploy_to: string;
  commit: string;
  branch: string;
  ref: string;
  refspec: string;
  remote: string;
  title: string;
  message: string;
  timestamp: number;
  author: string;
  author_email: string;
  author_avatar: string;
  link_url: string;
  signed: boolean;
  verified: boolean;
}
