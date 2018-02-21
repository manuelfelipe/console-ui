import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { groupBy, sortBy } from 'lodash';
import { ProjectService } from '../../../shared/project/project.service';
import { ProjectResponseFactory } from '../../../shared/project/project-response.factory';
import { Namespace, Project } from '../../../shared/project/project';
import { ObjectToArrayPipe } from '../../../shared/pipes/objectToArray/object-to-array.pipe';
import { ToastrService } from '../../../shared/toastr/toastr.service';
import { ProjectManager } from '../../../shared/project/project.manager';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  @Output() namespaceSelected: EventEmitter<Namespace> = new EventEmitter<Namespace>();

  projectsByRepos: { key: string; value: Project[] }[] = [];
  isCollapsed: { [key: string]: boolean } = {};
  isLoading = false;

  constructor(private projectManager: ProjectManager,
              private projectService: ProjectService,
              private objectToArrayPipe: ObjectToArrayPipe,
              private projectResponseFactory: ProjectResponseFactory,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.projectService.getProjects().first()
      .map(projectsResponse => this.projectResponseFactory.toProjects(projectsResponse))
      .finally(() => this.isLoading = false)
      .subscribe(projects => {
        // group by repo's name
        const projectsByRepoKeys = groupBy(projects, 'repository.owner');

        // convert object to array [{ key: repo's owner, value: projects }]
        const projectsByRepoKeysArray: { key: string; value: Project[] }[] = this.objectToArrayPipe.transform(projectsByRepoKeys);

        // sort array by repos' owners
        this.projectsByRepos = sortBy(projectsByRepoKeysArray, 'key');
      }, () => this.toastr.error(null, 'Error getting projects'));
  }

  extractEnv(namespace: string): string {
    if (!namespace) {
      return null;
    }

    if (namespace.endsWith('-develop')) {
      return 'dev';
    }

    if (namespace.endsWith('-qa')) {
      return 'qa';
    }

    return 'prod';
  }

  selectNamespace(namespace: Namespace, project: Project): void {
    this.projectManager.updateNamespace(namespace.name);
    this.projectManager.updateProject(project);

    this.namespaceSelected.emit(namespace);

    // if a redirect url is specified in queryParams, navigate to it
    this.route.queryParams.first()
      .filter(queryParams => !!queryParams && !!queryParams.redirect)
      .map(queryParams => queryParams.redirect)
      .subscribe(redirect => {
        const sections = redirect.split('/');
        this.router.navigate([sections[0], namespace.name, sections[1]]);
      });
  }
}
