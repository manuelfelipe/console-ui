export interface Event {
  what: string;
  where: string;
  who: {
    name: string;
    username: string;
    email: string;
  };
  project: {
    owner: string;
    repo: string;
  };
  type: string;
  namespace: string;
  source: string;
  description: string;
  timestamp: string;
}
