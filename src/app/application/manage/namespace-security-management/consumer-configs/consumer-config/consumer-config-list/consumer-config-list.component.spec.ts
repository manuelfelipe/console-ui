import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ConsumerConfigListComponent } from './consumer-config-list.component';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';
import { KongResponseFactory } from '../../../../../../shared/kong/kong-response.factory';
import { KongRequestFactory } from '../../../../../../shared/kong/kong-request.factory';
import { KongService } from '../../../../../../shared/kong/kong.service';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/toastr/toastr.service.mock';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kong/kong.service.mock';
import { KONG_CONSUMER_PLUGIN_CONFIGS } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugin-configs.data';
import { KONG_CONSUMERS } from '../../../../../../shared/kong/consumer/consumers.data';
import Spy = jasmine.Spy;

describe('ConsumerConfigListComponent', () => {
  let component: ConsumerConfigListComponent;
  let fixture: ComponentFixture<ConsumerConfigListComponent>;

  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;
  let toastrService: ToastrService;

  let getConfigSpy: Spy;
  let deleteConfigSpy: Spy;
  let toastrSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ConsumerConfigListComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ConsumerConfigListComponent],
        providers: [
          KongRequestFactory,
          KongResponseFactory,
          KONG_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kongService = TestBed.get(KongService);
    kongRequestFactory = TestBed.get(KongRequestFactory);
    kongResponseFactory = TestBed.get(KongResponseFactory);
    toastrService = TestBed.get(ToastrService);

    getConfigSpy = spyOn(kongService, 'getConsumerPluginConfig').and.returnValue(Observable.of({ data: KONG_CONSUMER_PLUGIN_CONFIGS }));
    deleteConfigSpy = spyOn(kongService, 'deleteConsumerPluginConfig');
    toastrSpy = spyOn(toastrService, 'error');

    fixture = TestBed.createComponent(ConsumerConfigListComponent);
    component = fixture.componentInstance;

    component.pluginName = 'acls';
    component.consumer = kongResponseFactory.toConsumer(KONG_CONSUMERS[0]);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should have a pluginSchema', () => {
    expect(component.pluginSchema).toBeDefined();
  });

  describe('ngOnChanges', () => {
    it('should reset configs if namespace changes', () => {
      component.configs = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      const changes = {
        namespace: new SimpleChange('console-server', 'console-server', true)
      };

      component.ngOnChanges(changes);
      expect(component.configs).toEqual([]);
    });

    it('should get consumer configs when consumer changes', () => {
      const EXPECTED = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      const changes = {
        consumer: new SimpleChange('consumer', 'consumer', true)
      };

      component.ngOnChanges(changes);
      expect(component.configs).toEqual(EXPECTED.reverse());  // reverse, because it's been sorted by date
    });
  });

  describe('deleteConsumerPluginConfig', () => {
    it('should do nothing if not confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(false);

      component.configs = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      component.deleteConsumerPluginConfig(component.configs[0]);

      expect(component.configs.length).toEqual(2);
      expect(component.configs).toContain(component.configs[0]);
      expect(deleteConfigSpy).not.toHaveBeenCalled();
    });

    it('should not delete if service failed to delete', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      deleteConfigSpy.and.returnValue(Observable.throw('error'));

      component.configs = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      component.deleteConsumerPluginConfig(component.configs[0]);

      expect(component.configs.length).toEqual(2);
      expect(component.configs).toContain(component.configs[0]);
      expect(deleteConfigSpy).toHaveBeenCalled();
      expect(toastrSpy).toHaveBeenCalled();
    });

    it('should delete if service deleted successfully', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      deleteConfigSpy.and.returnValue(Observable.of(null));

      component.configs = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);
      component.deleteConsumerPluginConfig(component.configs[0]);

      expect(component.configs.length).toEqual(1);
      expect(component.configs[0].id).toEqual(KONG_CONSUMER_PLUGIN_CONFIGS[1].id);
      expect(deleteConfigSpy).toHaveBeenCalled();
      expect(toastrSpy).not.toHaveBeenCalled();
    });
  });

  describe('consumerPluginConfigCreated', () => {
    it('should add config to first index', () => {
      component.configs = kongResponseFactory.toConsumerPluginConfigs(KONG_CONSUMER_PLUGIN_CONFIGS);

      expect(component.configs.length).toEqual(2);
      component.consumerPluginConfigCreated(component.configs[1]);

      expect(component.configs.length).toEqual(3);
      expect(component.configs[0].id).toEqual(KONG_CONSUMER_PLUGIN_CONFIGS[1].id);
    });
  });
});
