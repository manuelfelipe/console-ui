export interface Plugin {
  id: string;
  apiId?: string;
  consumerId?: string;
  name: string;
  config: any;
  enabled: boolean;
  createdAt: Date;
}
