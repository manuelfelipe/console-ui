export interface Downtime {
  id: string;
  uptimeId: string;
  downStartDate: Date;
  downEndDate: Date;
  extra: {
    statusCode: number;
    text: string;
  };
}
