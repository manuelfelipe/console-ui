import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ProvisionAppFormComponent } from './provision-app-form.component';
import Spy = jasmine.Spy;

describe('ProvisionAppFormComponent', () => {
  let component: ProvisionAppFormComponent;
  let fixture: ComponentFixture<ProvisionAppFormComponent>;

  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProvisionAppFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProvisionAppFormComponent],
        providers: [
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionAppFormComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.formChanged, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form with correct values', () => {
      expect(component.formGroup.value).toEqual({
        language: 'NodeJS',
        type: 'API',
        enableConfig: false,
      });
    });

    it('should emit formGroup on valueChanges', () => {
      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
      component.formGroup.patchValue({ language: 'Java' });

      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
    });
  });
});
