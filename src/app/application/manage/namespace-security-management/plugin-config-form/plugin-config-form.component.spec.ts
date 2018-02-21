import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { PluginConfigFormComponent } from './plugin-config-form.component';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { KongService } from '../../../../shared/kong/kong.service';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../../shared/kong/kong.service.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { Schema } from '../../../../shared/kong/plugin/schema';
import { Plugin } from '../../../../shared/kong/plugin/plugin';
import { KONG_PLUGINS } from '../../../../shared/kong/plugin/plugins.data';
import { KONG_PLUGIN_SCHEMA } from '../../../../shared/kong/plugin/schemas.data';
import { BaseRequest } from '../../../../shared/base-service/base-request';
import Spy = jasmine.Spy;

describe('PluginConfigFormComponent', () => {
  let component: PluginConfigFormComponent;
  let fixture: ComponentFixture<PluginConfigFormComponent>;

  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;
  let toastrService: ToastrService;

  let plugin: Plugin;
  let pluginSchema: Schema;

  let getPluginSchemaSpy: Spy;
  let addApiPluginSpy: Spy;
  let updateApiPluginSpy: Spy;

  let toastrSuccessSpy: Spy;
  let toastrErrorSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(PluginConfigFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [PluginConfigFormComponent],
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

    plugin = kongResponseFactory.toPlugin(KONG_PLUGINS[0]);
    pluginSchema = kongResponseFactory.toSchema(KONG_PLUGIN_SCHEMA);

    getPluginSchemaSpy = spyOn(kongService, 'getPluginSchema').and.returnValue(Observable.of(KONG_PLUGIN_SCHEMA));
    addApiPluginSpy = spyOn(kongService, 'addApiPlugin');
    updateApiPluginSpy = spyOn(kongService, 'updateApiPlugin');

    toastrSuccessSpy = spyOn(toastrService, 'success');
    toastrErrorSpy = spyOn(toastrService, 'error');

    fixture = TestBed.createComponent(PluginConfigFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should do nothing if enabledPlugin did not change', () => {
      component.ngOnChanges({});
      expect(getPluginSchemaSpy).not.toHaveBeenCalled();
    });

    it('should get enabledPlugin schema, but not patch config', () => {
      const generateFormSpy = spyOn(component, 'generateFormGroupFromSchema');
      const patchConfigSpy = spyOn(component, 'patchExistingConfig');
      component.plugin = null;
      component.ngOnChanges({
        enabledPlugin: new SimpleChange('acls', 'acls', true)
      });

      expect(getPluginSchemaSpy).toHaveBeenCalled();
      expect(generateFormSpy).toHaveBeenCalledWith(pluginSchema);
      expect(patchConfigSpy).not.toHaveBeenCalled();
    });

    it('should get enabledPlugin schema, but not patch config', () => {
      const generateFormSpy = spyOn(component, 'generateFormGroupFromSchema');
      const patchConfigSpy = spyOn(component, 'patchExistingConfig');
      component.plugin = plugin;
      component.ngOnChanges({
        enabledPlugin: new SimpleChange('acls', 'acls', true)
      });

      expect(getPluginSchemaSpy).toHaveBeenCalled();
      expect(generateFormSpy).toHaveBeenCalledWith(pluginSchema);
      expect(patchConfigSpy).toHaveBeenCalledWith(component.plugin.config);
    });
  });

  describe('generateFormGroupFromSchema', () => {
    it('should create empty formGroup controls if passed null', () => {
      component.generateFormGroupFromSchema(null);
      expect(component.formGroup.controls).toEqual({});
    });

    it('should create formGroup controls properly', () => {
      component.generateFormGroupFromSchema(pluginSchema);

      expect(component.formGroup.controls).not.toEqual({});
      expect(component.formGroup.controls.limit_by.value).toEqual(pluginSchema.fields.limit_by.default);
      expect(component.formGroup.controls.fake_regex_field.validator).toEqual(Validators.required);
    });
  });

  describe('patchExistingConfig', () => {
    it('should not patch anything if passed null', () => {
      component.generateFormGroupFromSchema(pluginSchema);
      const initialFormGroup = cloneDeep(component.formGroup);

      component.patchExistingConfig(null);
      expect(component.formGroup).toEqual(initialFormGroup);
    });

    it('should patch formGroup with config values', () => {
      component.generateFormGroupFromSchema(pluginSchema);
      const initialFormGroup = cloneDeep(component.formGroup);

      component.patchExistingConfig(plugin.config);
      expect(component.formGroup).not.toEqual(initialFormGroup);
      expect(component.formGroup.controls.minute.value).toEqual(20);
      expect(component.formGroup.controls.hour.value).toEqual(500);

      // {} get patched to ''
      expect(component.formGroup.controls.fake_regex_field.value).toEqual('');
    });
  });

  describe('onSubmit', () => {
    describe('with plugin', () => {
      it('should fail updating plugin if service fails', () => {
        updateApiPluginSpy.and.returnValue(Observable.throw('error'));
        component.namespace = 'console-server-develop';
        component.plugin = plugin;

        const EXPECTED_REQUEST: BaseRequest = {
          params: {
            id: component.namespace,
          },
          body: {
            id: plugin.id,
            name: plugin.name,
            config: {},
            enabled: true,
          },
        };

        component.onSubmit();
        expect(updateApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
        expect(toastrErrorSpy).toHaveBeenCalled();
      });
    });

    it('should update plugin', () => {
      const patchConfigSpy = spyOn(component, 'patchExistingConfig');
      const emitSpy = spyOn(component.pluginModified, 'emit');
      updateApiPluginSpy.and.returnValue(Observable.of(KONG_PLUGINS[0]));

      component.generateFormGroupFromSchema(pluginSchema);
      component.formGroup.controls.limit_by.patchValue('request');
      component.namespace = 'console-server-develop';
      component.plugin = plugin;

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          id: component.namespace,
        },
        body: {
          id: plugin.id,
          name: plugin.name,
          config: {
            limit_by: 'request',
            policy: 'cluster',
            redis_port: 6379,
            redis_timeout: 2000,
            fault_tolerant: true
          },
          enabled: true,
        },
      };

      component.onSubmit();
      expect(updateApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(patchConfigSpy).toHaveBeenCalledWith(plugin.config);
      expect(emitSpy).toHaveBeenCalledWith(plugin);
      expect(toastrSuccessSpy).toHaveBeenCalledWith(plugin.name, 'Successfully updated');
    });
  });

  describe('without plugin', () => {
    it('should fail adding plugin if service fails', () => {
      addApiPluginSpy.and.returnValue(Observable.throw('error'));
      component.namespace = 'console-server-develop';
      component.enabledPlugin = 'rate-limiting';
      component.plugin = null;

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          id: component.namespace,
        },
        body: {
          name: component.enabledPlugin,
          config: {}
        },
      };

      component.onSubmit();
      expect(addApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(toastrErrorSpy).toHaveBeenCalled();
    });

    it('should add plugin', () => {
      const patchConfigSpy = spyOn(component, 'patchExistingConfig');
      const emitSpy = spyOn(component.pluginModified, 'emit');
      addApiPluginSpy.and.returnValue(Observable.of(KONG_PLUGINS[0]));
      component.generateFormGroupFromSchema(pluginSchema);
      component.formGroup.controls.limit_by.patchValue('request');
      component.namespace = 'console-server-develop';
      component.enabledPlugin = 'rate-limiting';
      component.plugin = null;

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          id: component.namespace,
        },
        body: {
          name: component.enabledPlugin,
          config: {
            limit_by: 'request',
            policy: 'cluster',
            redis_port: 6379,
            redis_timeout: 2000,
            fault_tolerant: true
          }
        },
      };

      component.onSubmit();
      expect(addApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(patchConfigSpy).toHaveBeenCalledWith(plugin.config);
      expect(emitSpy).toHaveBeenCalledWith(plugin);
      expect(toastrSuccessSpy).toHaveBeenCalledWith(plugin.name, 'Successfully added');
    });
  });

  describe('disable', () => {
    it('should do nothing if no plugin', () => {
      updateApiPluginSpy.and.returnValue(Observable.of(KONG_PLUGINS[0]));
      component.generateFormGroupFromSchema(pluginSchema);
      component.formGroup.controls.limit_by.patchValue('request');
      component.namespace = 'console-server-develop';
      component.enabledPlugin = 'rate-limiting';
      component.plugin = null;

      component.disable();
      expect(updateApiPluginSpy).not.toHaveBeenCalled();
      expect(toastrErrorSpy).not.toHaveBeenCalled();
    });

    it('should fail disabling if service fails', () => {
      updateApiPluginSpy.and.returnValue(Observable.throw('error'));
      component.generateFormGroupFromSchema(pluginSchema);
      component.formGroup.controls.limit_by.patchValue('request');
      component.namespace = 'console-server-develop';
      component.enabledPlugin = 'rate-limiting';
      component.plugin = plugin;

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          id: component.namespace,
        },
        body: {
          id: plugin.id,
          name: component.enabledPlugin,
          config: {},
          enabled: false,
        },
      };

      component.disable();
      expect(updateApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(toastrErrorSpy).toHaveBeenCalled();
    });

    it('should disable plugin', () => {
      const patchConfigSpy = spyOn(component, 'patchExistingConfig');
      const emitSpy = spyOn(component.pluginModified, 'emit');
      updateApiPluginSpy.and.returnValue(Observable.of(KONG_PLUGINS[0]));
      component.generateFormGroupFromSchema(pluginSchema);
      component.formGroup.controls.limit_by.patchValue('request');
      component.namespace = 'console-server-develop';
      component.enabledPlugin = 'rate-limiting';
      component.plugin = plugin;

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          id: component.namespace,
        },
        body: {
          id: plugin.id,
          name: component.enabledPlugin,
          config: {},
          enabled: false,
        },
      };


      component.disable();
      expect(updateApiPluginSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(patchConfigSpy).toHaveBeenCalledWith(plugin.config);
      expect(emitSpy).toHaveBeenCalledWith(plugin);
      expect(toastrSuccessSpy).toHaveBeenCalledWith(plugin.name, 'Successfully disabled');
    });
  });
});
