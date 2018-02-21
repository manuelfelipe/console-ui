import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Project } from '../../../../shared/project/project';
import { ProjectManager } from '../../../../shared/project/project.manager';

@Component({
  selector: 'app-environment-details',
  templateUrl: './environment-details.component.html'
})
export class EnvironmentDetailsComponent implements OnInit, OnDestroy {

  project: Project;
  namespace: string;

  sub: Subscription;

  constructor(private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = Observable.combineLatest(this.projectManager.project, this.projectManager.namespace)
      .subscribe(([project, namespace]) => {
        this.project = project;
        this.namespace = namespace;
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
