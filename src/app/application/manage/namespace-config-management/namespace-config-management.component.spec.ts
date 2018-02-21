import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NamespaceConfigManagementComponent } from './namespace-config-management.component';
import { CONSUL_SERVICE_MOCK_PROVIDER } from '../../../shared/consul/config.service.mock';
import { ConsulRequestFactory } from '../../../shared/consul/consul-request.factory';
import { ConsulService } from '../../../shared/consul/consul.service';
import { CONSUL_KEYS } from '../../../shared/consul/configs.data';
import { ProjectResponseFactory } from '../../../shared/project/project-response.factory';
import { PROJECTS_RESPONSE } from '../../../shared/project/projects.data';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../shared/project/project.manager';
import Spy = jasmine.Spy;

describe('NamespaceConfigManagementComponent', () => {
  let component: NamespaceConfigManagementComponent;
  let fixture: ComponentFixture<NamespaceConfigManagementComponent>;

  let service: ConsulService;
  let requestFactory: ConsulRequestFactory;
  let projectResponseFactory: ProjectResponseFactory;
  let projectManager: ProjectManager;
  let getKeysSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceConfigManagementComponent, {
        set: {
          template: ''
        }
      })
      .configureTestingModule({
        declarations: [NamespaceConfigManagementComponent],
        providers: [
          CONSUL_SERVICE_MOCK_PROVIDER,
          ConsulRequestFactory,
          ProjectResponseFactory,
          PROJECT_MANAGER_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    requestFactory = TestBed.get(ConsulRequestFactory);
    projectResponseFactory = TestBed.get(ProjectResponseFactory);

    service = TestBed.get(ConsulService);
    getKeysSpy = spyOn(service, 'getKeys').and.returnValue(Observable.of(CONSUL_KEYS));

    projectManager = TestBed.get(ProjectManager);
    projectManager.project = Observable.of(projectResponseFactory.toProject(PROJECTS_RESPONSE[0]));

    fixture = TestBed.createComponent(NamespaceConfigManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should update selectedKey', () => {
      expect(component.keys[0]).toBe('CLOUD/');
      expect(component.selectedKey).toBe('YPID/ypid-proxy/');
    });
  });

  describe('getKeys', () => {
    it('should set keys, filtering empty ones', () => {
      component.onKeyClick(null);
      expect(component.keys[0]).toBe('CLOUD/');
    });

    it('should set keys, filtering empty ones and same as selectedKey', () => {
      component.onKeyClick('CLOUD/');
      expect(component.keys[0]).toBe('CLOUD/console-server/');
    });
  });

  describe('formatKey', () => {
    it('should return empty string', () => {
      component.selectedKey = null;
      const key = component.formatKey(null);

      expect(key).toBe('');
    });

    it('should return empty string', () => {
      component.selectedKey = 'CLOUD/';
      const key = component.formatKey(null);

      expect(key).toBe('');
    });

    it('should return key as is', () => {
      component.selectedKey = 'POR/';
      const key = component.formatKey('CLOUD/console-server/');

      expect(key).toBe('CLOUD/console-server/');
    });

    it('should return key as is', () => {
      component.selectedKey = null;
      const key = component.formatKey('CLOUD/');

      expect(key).toBe('CLOUD/');
    });

    it('should return key as is', () => {
      component.selectedKey = 'CLOUD/';
      const key = component.formatKey('cloud/console-server/');

      expect(key).toBe('cloud/console-server/');
    });

    it('should format key properly', () => {
      component.selectedKey = 'CLOUD/';
      const key = component.formatKey('CLOUD/console-server/');

      expect(key).toBe('console-server/');
    });
  });

  describe('onKeyClick', () => {
    it('should call getKeys if passed null', () => {
      const compGetKeysSpy = spyOn(component, 'getKeys');
      component.onKeyClick(null);

      expect(compGetKeysSpy).toHaveBeenCalledWith(null);
    });

    it('should call getKeys if passed empty string', () => {
      const compGetKeysSpy = spyOn(component, 'getKeys');
      component.onKeyClick('');

      expect(compGetKeysSpy).toHaveBeenCalledWith('');
    });

    it('should call getKeys if passed string', () => {
      const compGetKeysSpy = spyOn(component, 'getKeys');
      component.onKeyClick('CLOUD/console-server/');

      expect(compGetKeysSpy).toHaveBeenCalledWith('CLOUD/console-server/');
    });
  });
});
