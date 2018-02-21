import { Project } from '../../../shared/project/project';

export interface NamespaceSearch {
  name: string;
  project: Project;
  clusters: string[];
}
