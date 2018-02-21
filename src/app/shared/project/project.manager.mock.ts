import { Observable } from 'rxjs/Observable';

import { ProjectManager } from './project.manager';
import { Project } from './project';

class ProjectManagerMock {
  project: Observable<Project> = Observable.throw('ProjectManagerMock.project unimplemented');
  namespace: Observable<string> = Observable.throw('ProjectManagerMock.namespace unimplemented');

  updateProject(project: Project) {
    throw new Error('ProjectManagerMock.updateProject unimplemented');
  }

  updateNamespace(namespace: string) {
    throw new Error('ProjectManagerMock.updateNamespace unimplemented');
  }

  destroy(): void {
    throw new Error('ProjectManagerMock.destroy unimplemented');
  }
}

export const PROJECT_MANAGER_MOCK_PROVIDER = {
  provide: ProjectManager,
  useClass: ProjectManagerMock,
};
