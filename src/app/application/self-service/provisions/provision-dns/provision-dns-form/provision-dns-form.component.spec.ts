import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ProvisionDNSFormComponent } from './provision-dns-form.component';
import { ProvisionsService } from '../../../../../shared/provisions/provisions.service';
import { ProvisionsRequestFactory } from '../../../../../shared/provisions/provisions-request.factory';
import { PROVISIONS_SERVICE_MOCK_PROVIDER } from '../../../../../shared/provisions/provisions.service.mock';
import Spy = jasmine.Spy;

describe('ProvisionDNSFormComponent', () => {
  let component: ProvisionDNSFormComponent;
  let fixture: ComponentFixture<ProvisionDNSFormComponent>;

  let provisionsService: ProvisionsService;
  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProvisionDNSFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProvisionDNSFormComponent],
        providers: [
          PROVISIONS_SERVICE_MOCK_PROVIDER,
          ProvisionsRequestFactory,
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    provisionsService = TestBed.get(ProvisionsService);
    spyOn(provisionsService, 'checkDNS').and.returnValue(Observable.of(true));

    fixture = TestBed.createComponent(ProvisionDNSFormComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.formChanged, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form with dns types', () => {
      expect(component.formGroup.value).toEqual({
        '.YP.CA': '',
        '.PJ.CA': '',
      });
    });
  });

  describe('onTypeStateChange', () => {
    it('should enable/disable and emit formGroup onTypeStateChange', () => {
      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);

      expect(component.formGroup.controls['.YP.CA'].enabled).toEqual(false);
      component.onTypeStateChange('.YP.CA', true);
      expect(component.formGroup.controls['.YP.CA'].enabled).toEqual(true);

      component.onTypeStateChange('.YP.CA', false);
      expect(component.formGroup.controls['.YP.CA'].enabled).toEqual(false);

      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
    });
  });

  describe('isLoading', () => {
    it('should return false if undefined', () => {
      const isLoading = component.isLoading('.unknown.ca');
      expect(isLoading).toEqual(false);
    });

    it('should return false if not pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPristine();
      const isLoading = component.isLoading('.YP.CA');
      expect(isLoading).toEqual(false);
    });

    it('should return false if dirty', () => {
      component.formGroup.controls['.YP.CA'].markAsDirty();
      const isLoading = component.isLoading('.YP.CA');
      expect(isLoading).toEqual(false);
    });

    it('should return true if pristine and pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPending();
      const isLoading = component.isLoading('.YP.CA');
      expect(isLoading).toEqual(true);
    });
  });

  describe('hasSuccess', () => {
    it('should return false if undefined', () => {
      const hasSuccess = component.hasSuccess('.unknown.ca');
      expect(hasSuccess).toEqual(false);
    });

    it('should return false if not pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPristine();
      const hasSuccess = component.hasSuccess('.YP.CA');
      expect(hasSuccess).toEqual(false);
    });

    it('should return false if dirty', () => {
      component.formGroup.controls['.YP.CA'].markAsDirty();
      const hasSuccess = component.hasSuccess('.YP.CA');
      expect(hasSuccess).toEqual(false);
    });

    it('should return false if pristine and pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPending();
      const hasSuccess = component.hasSuccess('.YP.CA');
      expect(hasSuccess).toEqual(false);
    });

    it('should return true if enabled, dirty and invalid', () => {
      component.formGroup.controls['.YP.CA'].enable();
      component.formGroup.controls['.YP.CA'].markAsDirty();
      component.formGroup.controls['.YP.CA'].setErrors(null);
      const hasSuccess = component.hasSuccess('.YP.CA');
      expect(hasSuccess).toEqual(true);
    });
  });

  describe('hasWarning', () => {
    it('should return false if undefined', () => {
      const hasWarning = component.hasWarning('.unknown.ca');
      expect(hasWarning).toEqual(false);
    });

    it('should return false if not pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPristine();
      const hasWarning = component.hasWarning('.YP.CA');
      expect(hasWarning).toEqual(false);
    });

    it('should return false if dirty', () => {
      component.formGroup.controls['.YP.CA'].markAsDirty();
      const hasWarning = component.hasWarning('.YP.CA');
      expect(hasWarning).toEqual(false);
    });

    it('should return false if pristine and pending', () => {
      component.formGroup.controls['.YP.CA'].markAsPending();
      const hasWarning = component.hasWarning('.YP.CA');
      expect(hasWarning).toEqual(false);
    });

    it('should return true if enabled, dirty and invalid', () => {
      component.formGroup.controls['.YP.CA'].enable();
      component.formGroup.controls['.YP.CA'].markAsDirty();
      component.formGroup.controls['.YP.CA'].setErrors({ dnsTaken: true });
      const hasWarning = component.hasWarning('.YP.CA');
      expect(hasWarning).toEqual(true);
    });
  });
});
