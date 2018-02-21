import { Pod } from '../pod/pod';

export interface Deployment {
  name: string;
  namespace: string;
  image: string;
  uid: string;
  createdAt: Date;
  revisions: number;
  replicas: number;
  pods: Pod[];
}
