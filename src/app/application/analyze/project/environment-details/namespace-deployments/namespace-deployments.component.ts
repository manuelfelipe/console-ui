import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';
import { each, filter, find, findIndex, orderBy } from 'lodash';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { Deployment } from '../../../../../shared/kubernetes/deployment/deployment';
import { Pod } from '../../../../../shared/kubernetes/pod/pod';
import { ContainerState } from '../../../../../shared/kubernetes/pod/container-state';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';
import { NamespaceConfigMapsComponent } from '../namespace-config-maps/namespace-config-maps.component';
import { LocalDeploymentInstructionsComponent } from '../local-deployment-instructions/local-deployment-instructions.component';

@Component({
  selector: 'app-namespace-deployments',
  templateUrl: './namespace-deployments.component.html',
  styleUrls: ['./namespace-deployments.component.scss']
})
export class NamespaceDeploymentsComponent implements OnChanges, OnDestroy {

  @Input() namespace: string;
  isLoading = false;

  deploymentsByClusters: { cluster: string; deployments: Deployment[] }[] = [];
  localDeployment: Deployment;
  isCollapsed: { [key: string]: boolean } = {};
  sub: Subscription;

  // used in html only
  ContainerState = ContainerState;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesSocketService: KubernetesSocketService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory,
              private ngbModal: NgbModal) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace && this.namespace) {
      // reset values
      this.deploymentsByClusters = [];
      this.localDeployment = null;

      const deploymentsRequest = this.kubernetesRequestFactory.toGetNamespaceDeploymentsRequest(this.namespace);

      this.isLoading = true;
      this.kubernetesService.getNamespaceDeployments(deploymentsRequest).first()
        .map(responses => responses.map(response => ({
          cluster: response.cluster,
          deployments: this.kubernetesResponseFactory.toDeployments(response.deployments),
        })))
        .finally(() => this.isLoading = false)
        .subscribe(responses => {
          this.deploymentsByClusters = responses;

          // used to keep track of the latest deployment to run locally
          let latestPod: Pod;

          each(this.deploymentsByClusters, deploymentsByCluster => {
            const cluster = deploymentsByCluster.cluster;
            const deployments = deploymentsByCluster.deployments;

            each(deployments, deployment => {
              const podsRequest = this.kubernetesRequestFactory.toGetDeploymentPodsRequest(cluster, deployment.namespace, deployment.name);

              this.kubernetesService.getDeploymentPods(podsRequest).first()
                .do(() => this.watchDeploymentPods(cluster, deployment))
                .map(podsResponse => this.kubernetesResponseFactory.toPods(podsResponse))
                .subscribe(pods => {
                  deployment.pods = pods;

                  // we want to make sure to open LocalDeploymentInstructions with the latest buildNumber available from deployments pods
                  each(pods, pod => {
                    if (!latestPod || pod.buildNumber > latestPod.buildNumber) {
                      latestPod = pod;
                      this.localDeployment = deployment;
                    }
                  });
                });
            });
          });
        });
    }
  }

  // WATCHING FOR ITS PODS CHANGES
  watchDeploymentPods(cluster: string, deployment: Deployment): void {
    this.sub = this.kubernetesSocketService
      .watchDeploymentPods(cluster, deployment.namespace, deployment.name)
      .map(event => ({
        type: event.type,
        data: this.kubernetesResponseFactory.toPod(event.data)
      }))
      .subscribe(event => this.handlePodEvent(event, deployment));
  }

  handlePodEvent(event: WatchEvent<Pod>, deployment: Deployment): void {
    const eventType: WatchEventType = event ? event.type : -1;
    const eventPod: Pod = event ? event.data : null;

    switch (eventType) {
      case WatchEventType.ADDED:
        this.handlePodEventAdded(eventPod, deployment);
        break;
      case WatchEventType.MODIFIED:
        this.handlePodEventModified(eventPod, deployment);
        break;
      case WatchEventType.DELETED:
        this.handlePodEventDeleted(eventPod, deployment);
        break;
      default:
        console.log('Unrecognized event type:', eventType);
    }

    // reorder pods
    deployment.pods = orderBy(deployment.pods, ['createdAt'], ['desc']);
  }

  handlePodEventAdded(pod: Pod, deployment: Deployment): void {
    const existingPod = find(deployment.pods, { uid: pod.uid, name: pod.name });

    if (!existingPod) {
      deployment.pods.push(pod);
    }
  }

  handlePodEventModified(pod: Pod, deployment: Deployment): void {
    const oldPodIndex = findIndex(deployment.pods, { uid: pod.uid, name: pod.name });

    if (oldPodIndex > -1) {
      deployment.pods[oldPodIndex] = pod;
    }
  }

  handlePodEventDeleted(pod: Pod, deployment: Deployment): void {
    deployment.pods = filter(deployment.pods, (p) => (p.uid !== pod.uid && p.name !== pod.name));
  }

  terminatePod(cluster: string, namespace: string, pod: string): void {
    const request = this.kubernetesRequestFactory.toDeletePodRequest(cluster, namespace, pod);

    this.kubernetesService.deletePod(request).first()
      .subscribe(deletedPod => console.log(deletedPod));
  }

  // :namespace/:cluster/:pod/logs?container=containerName&previous=true/false
  openLogsWindow(cluster: string, namespace: string, pod: string, container: string, previous?: boolean): void {
    let logsUrl = `${cluster}/${namespace}/${pod}/logs?container=${container}`;

    if (previous) {
      logsUrl += '&previous=true';
    }

    window.open(logsUrl, `Logs - ${pod}`, 'height=700, width=700');
  }

  private unsubscribeWatchSubscription(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  openConfigMapsModal(cluster, namespace): void {
    const modalRef = this.ngbModal.open(NamespaceConfigMapsComponent, { size: 'lg' });

    modalRef.componentInstance.cluster = cluster;
    modalRef.componentInstance.namespace = namespace;
  }

  openDeployLocallyModal(): void {
    const modalRef = this.ngbModal.open(LocalDeploymentInstructionsComponent, { size: 'lg' });
    modalRef.componentInstance.deployment = this.localDeployment;
  }

  getStatusClass(containerState: ContainerState): string {
    if (containerState === ContainerState.running) {
      return 'badge-success';
    } else if (containerState === ContainerState.waiting) {
      return 'badge-warning';
    } else {
      return 'badge-danger';
    }
  }

  ngOnDestroy() {
    this.unsubscribeWatchSubscription();
  }
}
