import { Namespace, Repository } from './project';

export interface ProjectResponse {
  _id: string;
  __v: number;
  name: string;
  repository: Repository;
  namespaces: Namespace[];
  isDeleted: boolean;
  createdAt: string;
}
