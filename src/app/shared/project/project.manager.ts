import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';
import { Project } from './project';

@Injectable()
export class ProjectManager {
  project: Observable<Project>;
  namespace: Observable<string>;

  private projectSubject: BehaviorSubject<Project> = new BehaviorSubject<Project>(null);
  private namespaceSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private localStorageService: LocalStorageService) {
    this.project = this.projectSubject.asObservable();
    this.namespace = this.namespaceSubject.asObservable();

    this.updateProject(this.localStorageService.get<Project>('project'));
    this.updateNamespace(this.localStorageService.get<string>('namespace'));
  }

  updateProject(project: Project): void {
    this.localStorageService.set('project', project);
    this.projectSubject.next(project);
  }

  updateNamespace(namespace: string): void {
    this.localStorageService.set('namespace', namespace);
    this.namespaceSubject.next(namespace);
  }

  destroy(): void {
    this.updateProject(null);
    this.updateNamespace(null);
  }

}
