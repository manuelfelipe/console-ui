import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NamespaceConfigManagementBreadcrumbComponent } from './namespace-config-management-breadcrumb.component';
import Spy = jasmine.Spy;
import { SimpleChange } from '@angular/core';

describe('NamespaceConfigManagementBreadcrumbComponent', () => {
  let component: NamespaceConfigManagementBreadcrumbComponent;
  let fixture: ComponentFixture<NamespaceConfigManagementBreadcrumbComponent>;

  let keyNavClickedEmitterSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceConfigManagementBreadcrumbComponent, {
        set: {
          template: '',
        }
      })
      .configureTestingModule({
        declarations: [NamespaceConfigManagementBreadcrumbComponent]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NamespaceConfigManagementBreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    keyNavClickedEmitterSpy = spyOn(component.keyNavClickedEmitter, 'emit');
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const selectedKeyChanges = {
      selectedKey: new SimpleChange('CLOUD/', 'CLOUD/console-ui/', true)
    };

    it('should not split if selectedKey not changed', () => {
      component.selectedKey = 'CLOUD/console-server';
      component.ngOnChanges({});

      expect(component.splitSelectedKeys).toEqual([]);
    });

    it('should split selectedKey as empty array if null', () => {
      component.selectedKey = null;
      component.ngOnChanges(selectedKeyChanges);

      expect(component.splitSelectedKeys).toEqual([]);
    });

    it('should split selectedKey as empty array if empty string', () => {
      component.selectedKey = '';
      component.ngOnChanges(selectedKeyChanges);

      expect(component.splitSelectedKeys).toEqual([]);
    });

    it('should split selectedKey as empty strings if slash', () => {
      component.selectedKey = '/';
      component.ngOnChanges(selectedKeyChanges);

      expect(component.splitSelectedKeys).toEqual(['', '']);
    });

    it('should split selectedKey as array if string', () => {
      component.selectedKey = 'CLOUD/console-server';
      component.ngOnChanges(selectedKeyChanges);

      expect(component.splitSelectedKeys).toEqual(['CLOUD', 'console-server']);
    });

    it('should split selectedKey as array if string, with last item as empty string', () => {
      component.selectedKey = 'CLOUD/console-server/';
      component.ngOnChanges(selectedKeyChanges);

      expect(component.splitSelectedKeys).toEqual(['CLOUD', 'console-server', '']);
    });
  });

  describe('onKeyNavClicked', () => {
    it('should emit with empty string', () => {
      component.onKeyNavClicked(null);
      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('');
    });

    it('should emit with empty string', () => {
      component.onKeyNavClicked(null);
      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('');
    });

    it('should emit with empty string', () => {
      component.onKeyNavClicked(0);
      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('');
    });

    it('should emit with empty string', () => {
      component.onKeyNavClicked(0);
      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('');
    });

    it('should emit with correct key, idx = 0, 2 items', () => {
      component.splitSelectedKeys = ['CLOUD', 'console-server'];
      component.onKeyNavClicked(0);

      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('CLOUD/');
    });

    it('should emit with correct key, idx = 1, 2 items', () => {
      component.splitSelectedKeys = ['CLOUD', 'console-server'];
      component.onKeyNavClicked(1);

      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('CLOUD/console-server');
    });

    it('should emit with correct key, idx = 1, 3 items', () => {
      component.splitSelectedKeys = ['CLOUD', 'console-server', ''];
      component.onKeyNavClicked(1);

      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('CLOUD/console-server/');
    });

    it('should emit with correct key, idx = 2, 3 items', () => {
      component.splitSelectedKeys = ['CLOUD', 'console-server', ''];
      component.onKeyNavClicked(2);

      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('CLOUD/console-server/');
    });

    it('should emit with correct key, idx = 5, 3 items', () => {
      component.splitSelectedKeys = ['CLOUD', 'console-server', ''];
      component.onKeyNavClicked(5);

      expect(keyNavClickedEmitterSpy).toHaveBeenCalledWith('CLOUD/console-server/');
    });
  });
});
