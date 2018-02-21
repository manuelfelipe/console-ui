import { Component, Input } from '@angular/core';
import { get } from 'lodash';
import { Deployment } from '../../../../../../shared/kubernetes/deployment/deployment';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesResponseFactory } from '../../../../../../shared/kubernetes/kubernetes-response.factory';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';

@Component({
  selector: 'app-scale-deployment',
  templateUrl: './scale-deployment.component.html'
})
export class ScaleDeploymentComponent {

  @Input() cluster: string;
  @Input() deployment: Deployment;
  @Input() podsNumber = 0;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory) {
  }

  scaleDeploymentDown(): void {
    const replicas = get(this.deployment, 'replicas', 0);
    const newScale = replicas - 1;

    // since scaling down takes time,
    // we manually decrease podsNumber
    --this.podsNumber;

    this.scaleDeployment(newScale);
  }

  scaleDeploymentUp(): void {
    const replicas = get(this.deployment, 'replicas', 0);
    const newScale = replicas + 1;

    this.scaleDeployment(newScale);
  }

  private scaleDeployment(scale: number): void {
    const request = this.kubernetesRequestFactory
      .toPatchDeploymentScaleRequest(this.cluster, this.deployment.namespace, this.deployment.name, scale);

    this.kubernetesService.patchDeploymentScale(request)
      .map(this.kubernetesResponseFactory.toDeployment)
      .subscribe(deployment => {
        this.deployment = deployment;
      });
  }
}
