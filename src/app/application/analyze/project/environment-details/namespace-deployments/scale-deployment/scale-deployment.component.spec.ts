import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ScaleDeploymentComponent } from './scale-deployment.component';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kubernetes/kubernetes.service.mock';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../../shared/kubernetes/kubernetes-response.factory';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';
import { KUBERNETES_DEPLOYMENTS } from '../../../../../../shared/kubernetes/deployment/deployments.data';
import { Deployment } from '../../../../../../shared/kubernetes/deployment/deployment';
import { Observable } from 'rxjs/Observable';
import Spy = jasmine.Spy;

describe('ScaleDeploymentComponent', () => {
  let component: ScaleDeploymentComponent;
  let fixture: ComponentFixture<ScaleDeploymentComponent>;
  let kubernetesService: KubernetesService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesResponseFactory: KubernetesResponseFactory;
  let kubernetesServicePatchSpy: Spy;

  const CLUSTER = 'aws';
  let DEPLOYMENT: Deployment;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScaleDeploymentComponent],
      providers: [
        KUBERNETES_SERVICE_MOCK_PROVIDER,
        KubernetesRequestFactory,
        KubernetesResponseFactory,
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);

    DEPLOYMENT = kubernetesResponseFactory.toDeployment(KUBERNETES_DEPLOYMENTS[0]);

    kubernetesService = TestBed.get(KubernetesService);
    kubernetesServicePatchSpy = spyOn(kubernetesService, 'patchDeploymentScale').and.returnValue(Observable.of(KUBERNETES_DEPLOYMENTS[0]));

    fixture = TestBed.createComponent(ScaleDeploymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should scale down', () => {
    component.cluster = CLUSTER;
    component.deployment = DEPLOYMENT;

    const EXPECTED_REQUEST = {
      params: {
        cluster: component.cluster,
        namespace: component.deployment.namespace,
        deployment: component.deployment.name,
      },
      body: {
        scale: 1,
      },
    };

    component.scaleDeploymentDown();

    expect(kubernetesServicePatchSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
  });

  it('should scale up', () => {
    component.cluster = CLUSTER;
    component.deployment = DEPLOYMENT;

    const EXPECTED_REQUEST = {
      params: {
        cluster: component.cluster,
        namespace: component.deployment.namespace,
        deployment: component.deployment.name,
      },
      body: {
        scale: 3,
      },
    };

    component.scaleDeploymentUp();

    expect(kubernetesServicePatchSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
  });
});
