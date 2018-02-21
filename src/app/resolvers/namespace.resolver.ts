import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { ProjectRequestFactory } from '../shared/project/project-request.factory';
import { ProjectService } from '../shared/project/project.service';
import { ProjectResponseFactory } from '../shared/project/project-response.factory';
import { ProjectManager } from '../shared/project/project.manager';

@Injectable()
export class NamespaceResolver implements Resolve<any> {

  constructor(private projectManager: ProjectManager,
              private projectService: ProjectService,
              private projectRequestFactory: ProjectRequestFactory,
              private projectResponseFactory: ProjectResponseFactory) {
  }

  // Grabs the namespace in the URL, finds the project associated with it
  // and updates namespace/project via ProjectManager
  resolve(route: ActivatedRouteSnapshot) {
    const namespace = route.params.namespace;
    this.projectManager.updateNamespace(namespace);

    const request = this.projectRequestFactory.toGetProjectByNamespaceRequest(namespace);

    // get project asyncly, to not block UI
    this.projectService.getProjectByNamespace(request).first()
      .map(response => this.projectResponseFactory.toProject(response))
      .subscribe(project => this.projectManager.updateProject(project));

    return namespace;
  }
}
