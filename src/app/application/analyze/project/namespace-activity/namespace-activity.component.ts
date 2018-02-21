import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProjectManager } from '../../../../shared/project/project.manager';

@Component({
  selector: 'app-namespace-activity',
  templateUrl: './namespace-activity.component.html'
})
export class NamespaceActivityComponent implements OnInit, OnDestroy {

  namespace: string;
  sub: Subscription;

  constructor(private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = this.projectManager.namespace
      .subscribe(namespace => this.namespace = namespace);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
