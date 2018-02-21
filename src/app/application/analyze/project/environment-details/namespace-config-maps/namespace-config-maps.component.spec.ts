import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { NamespaceConfigMapsComponent } from './namespace-config-maps.component';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.service.mock';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { NGB_MODAL_MOCK_PROVIDER } from '../../../../../../testing/mocks/ngb-modal.mock';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { BaseRequest } from '../../../../../shared/base-service/base-request';
import Spy = jasmine.Spy;

describe('NamespaceConfigMapsComponent', () => {
  let component: NamespaceConfigMapsComponent;
  let fixture: ComponentFixture<NamespaceConfigMapsComponent>;

  let kubernetesService: KubernetesService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let configMapsSpy: Spy;

  const CONFIG_MAPS = {
    'config.escaped.json': '{\"provider\":{\"name\":\"thecloud\",\"configSource\":\"consul\"}}',
    'config.json': {
      provider: 'consul'
    },
    'config.text': 'text configs',
  };

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceConfigMapsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceConfigMapsComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          NGB_MODAL_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);

    kubernetesService = TestBed.get(KubernetesService);
    configMapsSpy = spyOn(kubernetesService, 'getServiceConfigMaps').and.returnValue(Observable.of(cloneDeep(CONFIG_MAPS)));

    fixture = TestBed.createComponent(NamespaceConfigMapsComponent);
    component = fixture.componentInstance;

    component.cluster = 'aws';
    component.namespace = 'console-server';

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get configMaps, and parse JSON if any', () => {
      const EXPECTED: BaseRequest = {
        params: {
          cluster: 'aws',
          namespace: 'console-server',
        }
      };

      expect(configMapsSpy).toHaveBeenCalledWith(EXPECTED);
      expect(component.configMapsHref).toBeDefined();

      // was a string, nothing happened
      expect(component.configMaps['config.text']).toEqual('text configs');

      // was already json, nothing happened
      expect(component.configMaps['config.json']).toEqual({
        provider: 'consul'
      });

      // json string has been parsed
      expect(component.configMaps['config.escaped.json']).toEqual({
        provider: {
          name: 'thecloud',
          configSource: 'consul'
        }
      });
    });
  });

  describe('generateDownloadHref', () => {
    it('should return safe url, null value', () => {
      const safeUrl = component.generateDownloadHref(null);
      expect(safeUrl).toBeDefined();
    });

    it('should return safe url, null value', () => {
      const safeUrl = component.generateDownloadHref({ a: 'b' });
      expect(safeUrl).toBeDefined();
    });
  });
});
