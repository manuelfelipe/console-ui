import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { KubernetesService } from '../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../shared/kubernetes/kubernetes-request.factory';
import { ProjectManager } from '../../../../shared/project/project.manager';

@Component({
  selector: 'app-namespace-traffic',
  templateUrl: './namespace-traffic.component.html'
})
export class NamespaceTrafficComponent implements OnInit, OnDestroy {

  kibanaUrl: SafeResourceUrl;
  sub: Subscription;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private projectManager: ProjectManager,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.sub = this.projectManager.namespace
      .filter(namespace => !!namespace)
      .do(() => this.kibanaUrl = null) // reset values
      .map(namespace => this.kubernetesRequestFactory.toGetNamespaceKibanaTrafficDashboardURLRequest(namespace, false))
      .mergeMap(request => this.kubernetesService.getNamespaceKibanaTrafficDashboardURL(request))
      .subscribe(kibanaUrl => this.kibanaUrl = kibanaUrl);
  };

  getSafeKibanaUrl(url): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
