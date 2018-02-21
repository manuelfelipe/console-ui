export interface Project {
  name: string;
  repository: Repository;
  namespaces: Namespace[];
  isDeleted: boolean;
  createdAt: Date;
}

export interface Namespace {
  _id?: string;
  name: string;
  clusters: string[];
}

export interface Repository {
  owner: string;
  name: string;
}
