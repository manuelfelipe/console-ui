import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProjectManager } from '../../../../shared/project/project.manager';

@Component({
  selector: 'app-uptime-namespace',
  templateUrl: './uptime-namespace.component.html'
})
export class UptimeNamespaceComponent implements OnInit, OnDestroy {

  category = 'ns';
  kind = 'Ingress';
  namespace: string;

  sub: Subscription;

  constructor(private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = this.projectManager.namespace
      .filter(namespace => !!namespace)
      .subscribe(namespace => this.namespace = namespace);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
