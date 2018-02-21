import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SimpleChange } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { NamespaceConfigManagementValueComponent } from './namespace-config-management-value.component';
import { CONSUL_SERVICE_MOCK_PROVIDER } from '../../../../shared/consul/config.service.mock';
import { ConsulService } from '../../../../shared/consul/consul.service';
import { ConsulRequestFactory } from '../../../../shared/consul/consul-request.factory';
import { isSecretKey } from '../../../../shared/consul/consul.utils';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../shared/toastr/toastr.service.mock';
import { CONSUL_CONFIG } from '../../../../shared/consul/configs.data';
import Spy = jasmine.Spy;

describe('NamespaceConfigManagementValueComponent', () => {
  let component: NamespaceConfigManagementValueComponent;
  let fixture: ComponentFixture<NamespaceConfigManagementValueComponent>;
  let toastrService: ToastrService;
  let consulService: ConsulService;
  let consulRequestFactory: ConsulRequestFactory;

  let getValueSpy: Spy;
  let setConfigSpy: Spy;
  let deleteConfigSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceConfigManagementValueComponent, {
        set: {
          template: '',
        }
      })
      .configureTestingModule({
        declarations: [NamespaceConfigManagementValueComponent],
        providers: [
          TOASTR_SERVICE_MOCK_PROVIDER,
          CONSUL_SERVICE_MOCK_PROVIDER,
          ConsulRequestFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.get(ToastrService);
    consulService = TestBed.get(ConsulService);
    consulRequestFactory = TestBed.get(ConsulRequestFactory);

    getValueSpy = spyOn(consulService, 'getValue').and.returnValue(Observable.of(CONSUL_CONFIG));
    setConfigSpy = spyOn(consulService, 'setConfig').and.returnValue(Observable.of(true));
    deleteConfigSpy = spyOn(consulService, 'deleteConfig').and.returnValue(Observable.of(true));

    fixture = TestBed.createComponent(NamespaceConfigManagementValueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const selectedkeyChanges = {
      selectedKey: new SimpleChange('folder/', 'folder/', true)
    };

    it('should do nothing if selectedKey not changed', () => {
      component.newKey = 'NewKey';
      component.config = 'Config';

      component.ngOnChanges({});
      expect(getValueSpy).not.toHaveBeenCalled();
    });

    it('should reset newKey and config, but not get value, if folder', () => {
      component.selectedKey = 'folder/';
      component.newKey = 'NewKey';
      component.config = 'Config';

      component.ngOnChanges(selectedkeyChanges);
      expect(component.newKey).toBeNull();
      expect(getValueSpy).not.toHaveBeenCalled();

      // it is important to not null it, because it causes
      // an 'Expression has already changed bla bla' error
      expect(component.config).toBe('');
    });

    it('should reset newKey and config, and get value, if not folder', () => {
      component.selectedKey = 'not/a/folder';
      component.newKey = 'NewKey';
      component.config = 'Config';

      component.ngOnChanges(selectedkeyChanges);
      expect(component.newKey).toBeNull();
      expect(getValueSpy).toHaveBeenCalled();

      // it is important to not null it, because it causes
      // an 'Expression has already changed bla bla' error
      expect(component.config).toEqual(CONSUL_CONFIG);
    });
  });

  describe('getFullKey', () => {
    it('should ignore undefined selectedKey', () => {
      component.selectedKey = null;
      component.newKey = 'NewKey';

      const fullKey = component.getFullKey();
      expect(fullKey).toBe('NewKey');
    });

    it('should ignore undefined newKey', () => {
      component.selectedKey = 'SelectedKey/';
      component.newKey = null;

      const fullKey = component.getFullKey();
      expect(fullKey).toBe('SelectedKey/');
    });

    it('should ignore undefined selectedKey and newKey', () => {
      component.selectedKey = null;
      component.newKey = null;

      const fullKey = component.getFullKey();
      expect(fullKey).toBeNull();
    });

    it('should ignore newKey if selectedKey is file', () => {
      component.selectedKey = 'SelectedKey/file';
      component.newKey = 'NewKey';

      const fullKey = component.getFullKey();
      expect(fullKey).toBe('SelectedKey/file');
    });

    it('should concatenate selectedKey and newKey', () => {
      component.selectedKey = 'SelectedKey/';
      component.newKey = 'NewKey';

      const fullKey = component.getFullKey();
      expect(fullKey).toBe('SelectedKey/NewKey');
    });
  });

  describe('setConfig', () => {
    it('should not set config if ace editor reports syntax errors', () => {
      spyOn(component, 'isAceEditorValid').and.returnValue(false);
      const alertSpy = spyOn(window, 'alert');

      const toastrSuccessSpy = spyOn(toastrService, 'success');
      const updateKeysEmitterSpy: Spy = spyOn(component.updateKeysEmitter, 'emit');

      component.selectedKey = '/SelectedKey/';
      component.newKey = 'NewKey';
      component.setConfig('{ invalid json :/ }');

      expect(setConfigSpy).not.toHaveBeenCalled();
      expect(updateKeysEmitterSpy).not.toHaveBeenCalled();
      expect(toastrSuccessSpy).not.toHaveBeenCalled();
      expect(alertSpy).toHaveBeenCalled();
    });

    it('should not set config if service fails', () => {
      setConfigSpy.and.returnValue(Observable.throw('error'));
      spyOn(component, 'isAceEditorValid').and.returnValue(true);
      const alertSpy = spyOn(window, 'alert');

      const toastrErrorSpy = spyOn(toastrService, 'error');
      const updateKeysEmitterSpy: Spy = spyOn(component.updateKeysEmitter, 'emit');

      component.selectedKey = '/SelectedKey/';
      component.newKey = 'NewKey';
      component.setConfig('{ invalid json :/ }');

      expect(setConfigSpy).toHaveBeenCalled();
      expect(toastrErrorSpy).toHaveBeenCalled();

      expect(updateKeysEmitterSpy).not.toHaveBeenCalled();
      expect(alertSpy).not.toHaveBeenCalled();
    });

    it('should emit SelectedKey/NewKey', () => {
      const toastrSuccessSpy = spyOn(toastrService, 'success');
      const updateKeysEmitterSpy: Spy = spyOn(component.updateKeysEmitter, 'emit');

      component.selectedKey = '/SelectedKey/';
      component.newKey = 'NewKey';
      component.setConfig('Value!');

      const EXPECTED_REQUEST = {
        params: {
          key: '/SelectedKey/NewKey',
        },
        body: {
          config: 'Value!',
        },
      };

      expect(setConfigSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(updateKeysEmitterSpy).toHaveBeenCalledWith('/SelectedKey/NewKey');
      expect(toastrSuccessSpy).toHaveBeenCalled();
      expect(component.newKey).toBeNull();
    });
  });

  describe('deleteKey', () => {
    it('should do nothing if not confirmed', () => {
      spyOn(window, 'confirm').and.returnValue(false);
      const updateKeysEmitterSpy: Spy = spyOn(component.updateKeysEmitter, 'emit');

      component.selectedKey = '/SelectedKey/folder2/folder3/';
      component.deleteSelectedKey();

      expect(deleteConfigSpy).not.toHaveBeenCalled();
      expect(updateKeysEmitterSpy).not.toHaveBeenCalled();
    });

    it('should emit SelectedKey/NewKey, with no slash in beginning', () => {
      spyOn(window, 'confirm').and.returnValue(true);
      const updateKeysEmitterSpy: Spy = spyOn(component.updateKeysEmitter, 'emit');

      component.selectedKey = '/SelectedKey/folder2/folder3/';
      component.deleteSelectedKey();

      const EXPECTED_REQUEST = {
        params: {
          key: '/SelectedKey/folder2/folder3/',
        },
      };

      expect(deleteConfigSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(updateKeysEmitterSpy).toHaveBeenCalledWith('SelectedKey/folder2/');
    });
  });

  describe('isSecretKey', () => {
    it('should concatenate selectedKey and newKey, to call isSecretKey()', () => {
      const isSecretKeySpy = spyOn(require('../../../../shared/consul/consul.utils'), 'isSecretKey');

      component.selectedKey = 'SELECTED_KEY/';
      component.newKey = 'NEW_KEY';
      component.isSecretKey();

      expect(isSecretKeySpy).toHaveBeenCalledWith('SELECTED_KEY/NEW_KEY');
    });

    it('should not concatenate selectedKey and newKey if selectedKey is null, before calling isSecretKey()', () => {
      const isSecretKeySpy = spyOn(require('../../../../shared/consul/consul.utils'), 'isSecretKey');

      component.selectedKey = null;
      component.newKey = 'NEW_KEY';
      component.isSecretKey();

      expect(isSecretKeySpy).toHaveBeenCalledWith('NEW_KEY');
    });

    it('should not concatenate selectedKey and newKey if newKey is null, before calling isSecretKey()', () => {
      const isSecretKeySpy = spyOn(require('../../../../shared/consul/consul.utils'), 'isSecretKey');

      component.selectedKey = 'SELECTED_KEY/';
      component.newKey = null;
      component.isSecretKey();

      expect(isSecretKeySpy).toHaveBeenCalledWith('SELECTED_KEY/');
    });
  });

  describe('getPreviousFolder', () => {
    it('should return `` if passed null', () => {
      const previousFolder = component.getPreviousFolder(null);
      expect(previousFolder).toBe('');
    });

    it('should return `` if passed empty string', () => {
      const previousFolder = component.getPreviousFolder('');
      expect(previousFolder).toBe('');
    });

    it('should return `` if passed a file, starting without slash', () => {
      const previousFolder = component.getPreviousFolder('file');
      expect(previousFolder).toBe('');
    });

    it('should return `` if passed a file, starting with slash', () => {
      const previousFolder = component.getPreviousFolder('/file');
      expect(previousFolder).toBe('');
    });

    it('should return `` if passed a folder, starting without slash', () => {
      const previousFolder = component.getPreviousFolder('folder/');
      expect(previousFolder).toBe('');
    });

    it('should return `` if passed a folder, starting with slash', () => {
      const previousFolder = component.getPreviousFolder('/folder/');
      expect(previousFolder).toBe('');
    });

    it('should return folder/ if ends with file', () => {
      const previousFolder = component.getPreviousFolder('/folder/file');
      expect(previousFolder).toBe('folder/');
    });

    it('should return folder/ if ends with folder', () => {
      const previousFolder = component.getPreviousFolder('/folder/folder2/');
      expect(previousFolder).toBe('folder/');
    });

    it('should return folder2/ if ends with 2 slashes', () => {
      const previousFolder = component.getPreviousFolder('/folder/folder2//');
      expect(previousFolder).toBe('folder/folder2/');
    });

    it('should return folder/ even with many symbols', () => {
      const previousFolder = component.getPreviousFolder('/folder/folder2~`!@#$%^&*()_-=+[{]|}";\'<>/');
      expect(previousFolder).toBe('folder/');
    });
  });

  describe('getAceMode', () => {
    it('should return aceMode based on the selectedKey, if its a file', () => {
      component.newKey = 'test.yaml';
      component.selectedKey = 'folder/test.json';

      const mode = component.getAceMode();
      expect(mode).toBe('json');
    });

    it('should return aceMode based on the newKey, if selectedKey is null', () => {
      component.newKey = 'test.json';
      component.selectedKey = null;

      const mode = component.getAceMode();
      expect(mode).toBe('json');
    });

    it('should return aceMode based on the newKey, if selectedKey is a folder', () => {
      component.newKey = 'test.json';
      component.selectedKey = 'folder/';

      const mode = component.getAceMode();
      expect(mode).toBe('json');
    });
  });
});
