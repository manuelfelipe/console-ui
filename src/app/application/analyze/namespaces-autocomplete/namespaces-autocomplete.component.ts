import { Component, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { each } from 'lodash';
import { NamespaceSearch } from './namespace-search';
import { ProjectManager } from '../../../shared/project/project.manager';
import { ProjectService } from '../../../shared/project/project.service';
import { ProjectRequestFactory } from '../../../shared/project/project-request.factory';
import { ProjectResponseFactory } from '../../../shared/project/project-response.factory';
import { Namespace } from '../../../shared/project/project';

// TODO: Group results by their project name
@Component({
  selector: 'app-namespaces-autocomplete',
  templateUrl: './namespaces-autocomplete.component.html',
  styleUrls: ['./namespaces-autocomplete.component.scss']
})
export class NamespacesAutocompleteComponent {

  modalRef: NgbModalRef;

  // list to search into
  private namespaces: NamespaceSearch[] = [];

  constructor(private projectManager: ProjectManager,
              private projectService: ProjectService,
              private projectRequestFactory: ProjectRequestFactory,
              private projectResponseProcessor: ProjectResponseFactory,
              private modalService: NgbModal,
              private router: Router) {
  }

  searchNamespaces = ($query: Observable<string>): Observable<NamespaceSearch[]> => {
    return $query
      .debounceTime(200)
      .mergeMap(query => {
        return query ? Observable.of(query)
          .do(() => query = query.toLowerCase())
          .map(this.projectRequestFactory.toSearchProjectsRequest)
          .mergeMap(request => this.projectService.searchProjects(request))
          .map(response => this.projectResponseProcessor.toProjects(response))
          .map(projects => {
            const results = [];

            each(projects, (project) => {
              each(project.namespaces, (namespace) => {
                if (namespace.name.toLowerCase().includes(query) || project.name.toLowerCase().includes(query)) {
                  results.push({
                    name: namespace.name,
                    project: project,
                    clusters: namespace.clusters,
                  });
                }
              });
            });

            return results.slice(0, 10);
          }) : Observable.of([]);
      });
  }

  projectFormatter = (n: NamespaceSearch) => n.name;

  selectProject(event: any): void {
    const namespaceSearch: NamespaceSearch = event ? event.item : null;

    this.projectManager.updateProject(namespaceSearch.project);
    this.projectManager.updateNamespace(namespaceSearch.name);

    // navigate to the project /analyze/<namespace>/environment-details
    this.navigateToProject(namespaceSearch.name);
  }

  openProjectsModal(projectsModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.open(projectsModal);
  }

  namespaceSelected(namespace: Namespace): void {
    if (this.modalRef) {
      this.modalRef.close();
    }

    this.navigateToProject(namespace.name);
  }

  navigateToProject(namespace: string) {
    if (namespace) {
      this.router.navigate(['/analyze', namespace, 'environment-details']);
    }
  }
}
