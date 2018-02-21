import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { ProvisionDBFormComponent } from './provision-db-form.component';
import Spy = jasmine.Spy;

describe('ProvisionDBFormComponent', () => {
  let component: ProvisionDBFormComponent;
  let fixture: ComponentFixture<ProvisionDBFormComponent>;

  let emitSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ProvisionDBFormComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ProvisionDBFormComponent],
        providers: [
          FormBuilder,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProvisionDBFormComponent);
    component = fixture.componentInstance;
    emitSpy = spyOn(component.formChanged, 'emit');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should init form with null type', () => {
      expect(component.formGroup.value).toEqual({
        type: null,
      });
    });

    it('should emit formGroup on valueChanges', () => {
      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
      component.formGroup.patchValue({ type: 'MySQL' });

      expect(emitSpy).toHaveBeenCalledWith(component.formGroup);
    });
  });
});
