import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodRestartsComponent } from './pod-restarts.component';
import { KUBERNETES_PODS } from '../../../../../../shared/kubernetes/pod/pods.data';
import { KubernetesResponseFactory } from '../../../../../../shared/kubernetes/kubernetes-response.factory';

describe('PodRestartsComponent', () => {
  let component: PodRestartsComponent;
  let fixture: ComponentFixture<PodRestartsComponent>;
  let kubernetesResponseFactory: KubernetesResponseFactory;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(PodRestartsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [PodRestartsComponent],
        providers: [KubernetesResponseFactory],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);
    const pod = kubernetesResponseFactory.toPod(KUBERNETES_PODS[0]);

    fixture = TestBed.createComponent(PodRestartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    component.pod = pod;
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
