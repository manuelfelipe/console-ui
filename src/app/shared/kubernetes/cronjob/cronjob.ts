export interface CronJob {
  name: string;
  uid: string;
  createdAt: Date;
  username: string;
  schedule: string;
  urls: string[];
  args: string[];
  reports?: CronJobReport[];
}

export interface CronJobReport {
  date: string;
  url: string;
}
