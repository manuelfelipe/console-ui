import { RequestRequirements } from './request-requirements';

export interface Endpoints {
  [key: string]: RequestRequirements;
}
