import { Project } from './project';
import { ProjectResponse } from './project-response';

export class ProjectResponseFactory {
  toProject(projectResponse: ProjectResponse): Project {
    if (!projectResponse) {
      return null;
    }

    return {
      name: projectResponse.name,
      repository: projectResponse.repository,
      namespaces: projectResponse.namespaces.map(namespace => ({
        name: namespace.name,
        clusters: namespace.clusters
      })),
      createdAt: new Date(projectResponse.createdAt),
      isDeleted: projectResponse.isDeleted,
    };
  };

  toProjects(projects: ProjectResponse[]): Project[] {
    if (!projects) {
      return [];
    }

    return projects.map(project => this.toProject(project));
  };
}
