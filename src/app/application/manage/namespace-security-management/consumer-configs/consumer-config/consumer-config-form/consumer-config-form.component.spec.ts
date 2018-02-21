import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ConsumerConfigFormComponent } from './consumer-config-form.component';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kong/kong.service.mock';
import { KongRequestFactory } from '../../../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../../../shared/kong/kong-response.factory';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/toastr/toastr.service.mock';
import { KongService } from '../../../../../../shared/kong/kong.service';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';
import { KONG_CONSUMER_PLUGIN_CONFIGS } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugin-configs.data';
import { BaseRequest } from '../../../../../../shared/base-service/base-request';
import { KONG_CONSUMERS } from '../../../../../../shared/kong/consumer/consumers.data';
import { KONG_PLUGIN_SCHEMA } from '../../../../../../shared/kong/plugin/schemas.data';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../../shared/kubernetes/kubernetes-response.factory';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kubernetes/kubernetes.service.mock';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';
import { KUBERNETES_LABELS } from '../../../../../../shared/kubernetes/labels/labels.data';
import Spy = jasmine.Spy;

describe('ConsumerConfigFormComponent', () => {
  let component: ConsumerConfigFormComponent;
  let fixture: ComponentFixture<ConsumerConfigFormComponent>;

  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;

  let kubernetesService: KubernetesService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesResponseFactory: KubernetesResponseFactory;

  let toastrService: ToastrService;
  let getLabelsSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ConsumerConfigFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ConsumerConfigFormComponent],
        providers: [
          KongRequestFactory,
          KongResponseFactory,
          KONG_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          KubernetesResponseFactory,
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kongService = TestBed.get(KongService);
    kongRequestFactory = TestBed.get(KongRequestFactory);
    kongResponseFactory = TestBed.get(KongResponseFactory);

    kubernetesService = TestBed.get(KubernetesService);
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);

    getLabelsSpy = spyOn(kubernetesService, 'getNamespaceLabels').and.returnValue(Observable.of(KUBERNETES_LABELS));
    toastrService = TestBed.get(ToastrService);

    fixture = TestBed.createComponent(ConsumerConfigFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should not set pluginSchema if pluginName has no schema', () => {
      component.pluginName = 'unknownPluginName';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeUndefined();
    });

    it('should set pluginSchema with acls schema', () => {
      component.pluginName = 'acls';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set pluginSchema with key-auth schema', () => {
      component.pluginName = 'key-auth';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set pluginSchema with basic-auth schema', () => {
      component.pluginName = 'basic-auth';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set pluginSchema with oauth2 schema', () => {
      component.pluginName = 'oauth2';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set pluginSchema with hmac-auth schema', () => {
      component.pluginName = 'hmac-auth';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set pluginSchema with jwt schema', () => {
      component.pluginName = 'jwt';
      component.ngOnChanges({});

      expect(component.pluginSchema).toBeDefined();
    });

    it('should set formGroup with correct controls', () => {
      component.pluginName = 'acls';
      component.ngOnChanges({});

      expect(component.formGroup.controls.group).toBeDefined();
      expect(component.formGroup.controls.group.validator).toEqual(Validators.required);
    });

    it('should getNamespaceLabels if `acls` plugin', () => {
      component.pluginName = 'acls';
      component.namespace = 'console-server';
      component.ngOnChanges({
        namespace: new SimpleChange('console-server', 'console-server', true)
      });

      expect(getLabelsSpy).toHaveBeenCalledWith({ params: { namespace: 'console-server' } });
      expect(component.suffix).toEqual('@cloud.dev');
    });
  });

  describe('submit', () => {
    it('should call toastrService when it fails', () => {
      spyOn(kongService, 'createConsumerPluginConfig').and.returnValue(Observable.throw('Error'));
      const toastrSpy = spyOn(toastrService, 'error');

      component.submit();
      expect(toastrSpy).toHaveBeenCalledWith(undefined, 'Error creating config!');
    });

    it('should emit created consumerPluginConfig', () => {
      const createConfigSpy = spyOn(kongService, 'createConsumerPluginConfig')
        .and.returnValue(Observable.of(KONG_CONSUMER_PLUGIN_CONFIGS[0]));
      const emitSpy = spyOn(component.consumerConfigCreated, 'emit');
      const toastrSpy = spyOn(toastrService, 'error');

      // to init formGroup
      component.pluginName = 'acls';
      component.namespace = 'console-develop';
      component.pluginSchema = kongResponseFactory.toSchema(KONG_PLUGIN_SCHEMA);
      component.consumer = kongResponseFactory.toConsumer(KONG_CONSUMERS[0]);
      component.ngOnChanges({});

      component.formGroup.controls.group.patchValue('admin');

      const EXPECTED = kongResponseFactory.toConsumerPluginConfig(KONG_CONSUMER_PLUGIN_CONFIGS[0]);
      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          username: KONG_CONSUMERS[0].username,
          pluginName: 'acls',
        },
        body: {
          namespace: 'console-develop',
          config: {
            group: 'admin',
          }
        },
      };

      component.submit();
      expect(toastrSpy).not.toHaveBeenCalled();
      expect(emitSpy).toHaveBeenCalledWith(EXPECTED);
      expect(createConfigSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
    });
  });
});
