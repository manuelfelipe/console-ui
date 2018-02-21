import { Observable } from 'rxjs/Observable';
import { ProjectService } from './project.service';
import { ProjectResponse } from './project-response';
import { BaseRequest } from '../base-service/base-request';

class ProjectServiceMock {

  getProjects(): Observable<ProjectResponse> {
    throw new Error('ProjectServiceMock.getProjects unimplemented');
  }

  getProjectByName(request: BaseRequest): Observable<ProjectResponse> {
    throw new Error('ProjectServiceMock.getProjectByName unimplemented');
  }

  searchProjects(request: BaseRequest): Observable<ProjectResponse[]> {
    throw new Error('ProjectServiceMock.searchProjects unimplemented');
  }

}

export const PROJECT_SERVICE_MOCK_PROVIDER = {
  provide: ProjectService,
  useClass: ProjectServiceMock,
};
