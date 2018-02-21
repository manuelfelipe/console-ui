import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { NamespaceDeploymentsComponent } from './namespace-deployments.component';
import { NamespaceConfigMapsComponent } from '../namespace-config-maps/namespace-config-maps.component';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.service.mock';
import { KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.socket.mock';
import { KUBERNETES_DEPLOYMENTS } from '../../../../../shared/kubernetes/deployment/deployments.data';
import { KUBERNETES_PODS } from '../../../../../shared/kubernetes/pod/pods.data';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';
import { Deployment } from '../../../../../shared/kubernetes/deployment/deployment';
import { Pod } from '../../../../../shared/kubernetes/pod/pod';
import { PodStatus } from '../../../../../shared/kubernetes/pod/pod-status';
import { ContainerState } from '../../../../../shared/kubernetes/pod/container-state';
import { NGB_MODAL_MOCK_PROVIDER } from '../../../../../../testing/mocks/ngb-modal.mock';
import { LocalDeploymentInstructionsComponent } from '../local-deployment-instructions/local-deployment-instructions.component';
import Spy = jasmine.Spy;

describe('NamespaceDeploymentsComponent', () => {
  let component: NamespaceDeploymentsComponent;
  let fixture: ComponentFixture<NamespaceDeploymentsComponent>;

  let kubernetesService: KubernetesService;
  let kubernetesSocketService: KubernetesSocketService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesResponseFactory: KubernetesResponseFactory;
  let ngbModal: NgbModal;

  let getDeploymentPodsSpy: Spy;
  let getNamespaceDeploymentsSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceDeploymentsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceDeploymentsComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          KubernetesResponseFactory,
          NGB_MODAL_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    ngbModal = TestBed.get(NgbModal);

    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);

    kubernetesService = TestBed.get(KubernetesService);
    getNamespaceDeploymentsSpy = spyOn(kubernetesService, 'getNamespaceDeployments').and.returnValue(Observable.of([
      {
        cluster: 'aws',
        deployments: KUBERNETES_DEPLOYMENTS,
      },
      {
        cluster: 'gce',
        deployments: [],
      }
    ]));
    getDeploymentPodsSpy = spyOn(kubernetesService, 'getDeploymentPods').and.returnValue(Observable.of(KUBERNETES_PODS));

    kubernetesSocketService = TestBed.get(KubernetesSocketService);
    spyOn(kubernetesSocketService, 'watchDeploymentPods').and.returnValue(Observable.of({
      type: 1,
      data: KUBERNETES_PODS[0],
    }));

    fixture = TestBed.createComponent(NamespaceDeploymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const changes = {
      namespace: new SimpleChange('console-server', 'console-server', true)
    };

    it('should do nothing if namespace not changed', () => {
      component.namespace = 'console-server';
      component.ngOnChanges({});

      expect(component.deploymentsByClusters).toEqual([]);
      expect(getNamespaceDeploymentsSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if namespace is null', () => {
      component.namespace = null;
      component.ngOnChanges(changes);

      expect(component.deploymentsByClusters).toEqual([]);
      expect(getNamespaceDeploymentsSpy).not.toHaveBeenCalled();
    });

    it('should set deploymentsByClusters properly', () => {
      component.namespace = 'console-server';
      component.ngOnChanges(changes);

      const EXPECTED: { cluster: string; deployments: Deployment[] }[] = [
        {
          cluster: 'aws',
          deployments: kubernetesResponseFactory.toDeployments(KUBERNETES_DEPLOYMENTS),
        },
        {
          cluster: 'gce',
          deployments: [],
        }
      ];
      EXPECTED[0].deployments[0].pods = kubernetesResponseFactory.toPods(KUBERNETES_PODS);

      expect(component.deploymentsByClusters).toEqual(EXPECTED);
      expect(getNamespaceDeploymentsSpy).toHaveBeenCalledWith({
        params: {
          namespace: 'console-server'
        }
      });
    });
  });

  describe('openLogsWindow', () => {
    it('should open new logs window, without `previous`', () => {
      const openSpy = spyOn(window, 'open');

      component.openLogsWindow('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER', false);
      expect(openSpy).toHaveBeenCalledWith(`CLUSTER/NAMESPACE/POD/logs?container=CONTAINER`, `Logs - POD`, 'height=700, width=700');
    });

    it('should open new logs window, with `previous`', () => {
      const openSpy = spyOn(window, 'open');

      component.openLogsWindow('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER', true);
      expect(openSpy).toHaveBeenCalledWith(`CLUSTER/NAMESPACE/POD/logs?container=CONTAINER&previous=true`, `Logs - POD`, 'height=700, width=700');
    });
  });

  it('should open config maps modal', () => {
    const openSpy = spyOn(ngbModal, 'open').and.returnValue({ componentInstance: {} });

    component.openConfigMapsModal('CLUSTER', 'NAMESPACE');
    expect(openSpy).toHaveBeenCalledWith(NamespaceConfigMapsComponent, { size: 'lg' });
  });

  it('should open local deployment instructions modal', () => {
    const openSpy = spyOn(ngbModal, 'open').and.returnValue({ componentInstance: {} });

    component.openDeployLocallyModal();
    expect(openSpy).toHaveBeenCalledWith(LocalDeploymentInstructionsComponent, { size: 'lg' });
  });

  describe('handlePodEvent', () => {
    let handlePodEventAddedSpy: Spy;
    let handlePodEventModifiedSpy: Spy;
    let handlePodEventDeletedSpy: Spy;

    beforeEach(() => {
      handlePodEventAddedSpy = spyOn(component, 'handlePodEventAdded').and.callThrough();
      handlePodEventModifiedSpy = spyOn(component, 'handlePodEventModified').and.callThrough();
      handlePodEventDeletedSpy = spyOn(component, 'handlePodEventDeleted').and.callThrough();
    });

    it('should not call anything', () => {
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      component.handlePodEvent(null, deployment);

      expect(handlePodEventAddedSpy).not.toHaveBeenCalled();
      expect(handlePodEventModifiedSpy).not.toHaveBeenCalled();
      expect(handlePodEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should order pods by pod.createdAt, desc', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = [pod];

      const podToAdd: Pod = cloneDeep(pod);
      podToAdd.uid = 'new uid';
      podToAdd.name = 'new name';
      podToAdd.createdAt.setDate(podToAdd.createdAt.getDate() + 1); // 1 day later, should come first

      const event: WatchEvent<Pod> = {
        type: WatchEventType.ADDED,
        data: podToAdd,
      };

      // should be added
      expect(deployment.pods.length).toBe(1);
      component.handlePodEvent(event, deployment);
      expect(deployment.pods.length).toBe(2);

      // should have called handlePodEventAdded() only
      expect(handlePodEventAddedSpy).toHaveBeenCalledWith(podToAdd, deployment);
      expect(handlePodEventModifiedSpy).not.toHaveBeenCalled();
      expect(handlePodEventDeletedSpy).not.toHaveBeenCalled();

      // should have podToAdd first in array
      expect(deployment.pods[0]).toEqual(podToAdd);
      expect(deployment.pods[1]).toEqual(pod);
    });

    it('should call handlePodEventAdded', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      const event: WatchEvent<Pod> = {
        type: WatchEventType.ADDED,
        data: pod,
      };

      component.handlePodEvent(event, deployment);

      expect(handlePodEventAddedSpy).toHaveBeenCalledWith(pod, deployment);
      expect(handlePodEventModifiedSpy).not.toHaveBeenCalled();
      expect(handlePodEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handlePodEventModified', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      const event: WatchEvent<Pod> = {
        type: WatchEventType.MODIFIED,
        data: pod,
      };

      component.handlePodEvent(event, deployment);

      expect(handlePodEventAddedSpy).not.toHaveBeenCalled();
      expect(handlePodEventModifiedSpy).toHaveBeenCalledWith(pod, deployment);
      expect(handlePodEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handlePodEventDeleted', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      const event: WatchEvent<Pod> = {
        type: WatchEventType.DELETED,
        data: pod,
      };

      component.handlePodEvent(event, deployment);

      expect(handlePodEventAddedSpy).not.toHaveBeenCalled();
      expect(handlePodEventModifiedSpy).not.toHaveBeenCalled();
      expect(handlePodEventDeletedSpy).toHaveBeenCalledWith(pod, deployment);
    });
  });

  describe('handlePodEventAdded', () => {
    it('should not add pod if already exists', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = [pod];

      expect(deployment.pods.length).toBe(1);
      component.handlePodEventAdded(pod, deployment);
      expect(deployment.pods.length).toBe(1);
    });

    it('should add pod if does not exists', () => {
      const pod: Pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);

      expect(deployment.pods.length).toBe(0);
      component.handlePodEventAdded(pod, deployment);
      expect(deployment.pods.length).toBe(1);
      expect(deployment.pods).toContain(pod);
    });
  });

  describe('handlePodEventModified', () => {
    it('should not replace pod if does not exists', () => {
      const pods: Pod[] = kubernetesResponseFactory.toPods(KUBERNETES_PODS);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = pods;

      const modifiedPod = cloneDeep(pods[0]);
      modifiedPod.name = 'unknown name'; // should not be found/modified

      expect(deployment.pods.length).toBe(pods.length);

      component.handlePodEventModified(modifiedPod, deployment);
      expect(deployment.pods.length).toBe(pods.length);
      expect(deployment.pods).toEqual(pods);
      expect(deployment.pods).not.toContain(modifiedPod);
    });

    it('should replace pod if exists', () => {
      const pods: Pod[] = kubernetesResponseFactory.toPods(KUBERNETES_PODS);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = pods;

      const modifiedPod = cloneDeep(pods[0]);
      modifiedPod.status = PodStatus.Pending; // Pending instead of Running
      modifiedPod.containerState = ContainerState.waiting; // waiting instead of running

      expect(deployment.pods.length).toBe(pods.length);

      component.handlePodEventModified(modifiedPod, deployment);
      expect(deployment.pods.length).toBe(pods.length);
      expect(deployment.pods[0].status).toBe(PodStatus.Pending);
      expect(deployment.pods[0].containerState).toBe(ContainerState.waiting);
    });
  });

  describe('handlePodEventDeleted', () => {
    it('should not delete pod if not found', () => {
      const pods: Pod[] = kubernetesResponseFactory.toPods(KUBERNETES_PODS);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = pods;

      const toDelete = cloneDeep(pods[0]);
      toDelete.uid = 'unknown uid';
      toDelete.name = 'unknown name';

      expect(deployment.pods.length).toBe(pods.length);

      component.handlePodEventDeleted(toDelete, deployment);
      expect(deployment.pods.length).toBe(pods.length);
      expect(deployment.pods).toEqual(pods);
    });

    it('should delete pod if found', () => {
      const pods: Pod[] = kubernetesResponseFactory.toPods(KUBERNETES_PODS);
      const deployment: Deployment = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);
      deployment.pods = pods;

      const modifiedPod = cloneDeep(pods[0]);
      expect(deployment.pods.length).toBe(pods.length);

      component.handlePodEventDeleted(modifiedPod, deployment);
      expect(deployment.pods.length).toBe(pods.length - 1);
    });
  });

  describe('terminatePod', () => {
    it('should terminate pod', () => {
      const deletePodSpy = spyOn(kubernetesService, 'deletePod').and.returnValue(Observable.of(true));

      component.terminatePod('aws', 'console-server', 'console-server-81070613');
      expect(deletePodSpy).toHaveBeenCalledWith({
        params: {
          cluster: 'aws',
          namespace: 'console-server',
          pod: 'console-server-81070613',
        }
      });
    });
  });

  describe('getStatusClass', () => {
    it('should return `badge-success` if passed `running`', () => {
      const statusClass = component.getStatusClass(ContainerState.running);
      expect(statusClass).toBe('badge-success');
    });

    it('should return `badge-warning` if passed `waiting`', () => {
      const statusClass = component.getStatusClass(ContainerState.waiting);
      expect(statusClass).toBe('badge-warning');
    });

    it('should return badge-danger if passed null', () => {
      const statusClass = component.getStatusClass(null);
      expect(statusClass).toBe('badge-danger');
    });

    it('should return badge-danger if passed `terminated`', () => {
      const statusClass = component.getStatusClass(ContainerState.terminated);
      expect(statusClass).toBe('badge-danger');
    });
  });
});
