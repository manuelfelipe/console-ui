import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';
import { NamespaceTrafficComponent } from './namespace-traffic.component';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../shared/kubernetes/kubernetes.service.mock';
import { KubernetesService } from '../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../shared/kubernetes/kubernetes-request.factory';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../../shared/project/project.manager';
import Spy = jasmine.Spy;

describe('NamespaceTrafficComponent', () => {
  let component: NamespaceTrafficComponent;
  let fixture: ComponentFixture<NamespaceTrafficComponent>;

  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesService: KubernetesService;
  let kubernetesServiceSpy: Spy;
  let projectManager: ProjectManager;
  let sanitizer: DomSanitizer;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceTrafficComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceTrafficComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          PROJECT_MANAGER_MOCK_PROVIDER,
          DomSanitizer,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);

    kubernetesService = TestBed.get(KubernetesService);
    kubernetesServiceSpy = spyOn(kubernetesService, 'getNamespaceKibanaTrafficDashboardURL')
      .and.returnValue(Observable.of('https://UnsafeKibanaUrlWithQuery.com'));

    sanitizer = TestBed.get(DomSanitizer);
    spyOn(sanitizer, 'bypassSecurityTrustResourceUrl').and.returnValue('https://SafeKibanaUrlWithQuery.com');

    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(NamespaceTrafficComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set Kibana URL', () => {
      const EXPECTED = `https://UnsafeKibanaUrlWithQuery.com`;
      expect(component.kibanaUrl).toBe(EXPECTED);
    });
  });

  describe('getSafeKibanaUrl', () => {
    it('should return safe url', () => {
      const safeUrl = component.getSafeKibanaUrl('https://UnsafeKibanaUrlWithQuery.com');
      expect(safeUrl).toBe('https://SafeKibanaUrlWithQuery.com');
    });
  });
});
