import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NamespaceSecurityManagementComponent } from './namespace-security-management.component';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../shared/kong/kong.service.mock';
import { KongService } from '../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../shared/kong/kong-response.factory';
import { KONG_ENABLED_PLUGINS } from '../../../shared/kong/enabled-plugins/enabled-plugins.data';
import { KONG_PLUGINS } from '../../../shared/kong/plugin/plugins.data';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../shared/project/project.manager';

describe('NamespaceSecurityManagementComponent', () => {
  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;
  let projectManager: ProjectManager;

  let component: NamespaceSecurityManagementComponent;
  let fixture: ComponentFixture<NamespaceSecurityManagementComponent>;

  let getApiPluginsSpy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceSecurityManagementComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceSecurityManagementComponent],
        providers: [
          KongRequestFactory,
          KongResponseFactory,
          KONG_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kongRequestFactory = TestBed.get(KongRequestFactory);
    kongResponseFactory = TestBed.get(KongResponseFactory);

    kongService = TestBed.get(KongService);
    getApiPluginsSpy = spyOn(kongService, 'getApiPlugins').and.returnValue(Observable.of({ data: KONG_PLUGINS }));
    spyOn(kongService, 'getEnabledPlugins').and.returnValue(Observable.of(KONG_ENABLED_PLUGINS));

    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(NamespaceSecurityManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have enabledPlugins set', () => {
    expect(component.enabledPlugins).toEqual(KONG_ENABLED_PLUGINS);
  });

  describe('ngOnInit', () => {
    it('should call getApiPlugins', () => {
      const plugins = kongResponseFactory.toPlugins(KONG_PLUGINS);
      const EXPECTED = {
        'rate-limiting': plugins[0],
        'acl': plugins[1],
      };

      expect(component.plugins).toEqual(EXPECTED);
      expect(getApiPluginsSpy).toHaveBeenCalled();
    });
  });

  describe('pluginModified', () => {
    it('should reassign modified plugin', () => {
      const plugin = kongResponseFactory.toPlugin(KONG_PLUGINS[0]);

      component.pluginModified(plugin);
      expect(component.plugins[plugin.name]).toEqual(plugin);
    });
  });
});
