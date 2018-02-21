import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldBooleanComponent } from './field-boolean.component';

describe('FieldBooleanComponent', () => {
  let component: FieldBooleanComponent;
  let fixture: ComponentFixture<FieldBooleanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FieldBooleanComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FieldBooleanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should start with false value', () => {
    expect(component.value).toBe(false);
  });

  describe('setValue', () => {
    it('should set value, and call onChange/onTouched', () => {
      const onChangeSpy = spyOn(component, 'onChange');
      const onTouchedSpy = spyOn(component, 'onTouched');

      component.setValue(true);

      expect(component.value).toBe(true);
      expect(onChangeSpy).toHaveBeenCalledWith(true);
      expect(onTouchedSpy).toHaveBeenCalled();
    });
  });

  describe('registerOnChanged', () => {
    it('should register onTouched', () => {
      const onChange: Function = () => 'Hello World';

      component.registerOnChange(onChange);
      expect(component.onChange).toEqual(onChange);
    });
  });

  describe('registerOnTouched', () => {
    it('should register onTouched', () => {
      const onTouched: Function = () => 'Hello World';

      component.registerOnTouched(onTouched);
      expect(component.onTouched).toEqual(onTouched);
    });
  });

  describe('writeValue', () => {
    it('should register onTouched', () => {
      const setValueSpy = spyOn(component, 'setValue').and.callThrough();
      component.writeValue(true);

      expect(component.value).toBe(true);
      expect(setValueSpy).toHaveBeenCalledWith(true);
    });
  });

  describe('toggle', () => {
    it('should toggle value', () => {
      const setValueSpy = spyOn(component, 'setValue').and.callThrough();
      component.toggle();

      expect(component.value).toBe(true);
      expect(setValueSpy).toHaveBeenCalledWith(true);

      component.toggle();

      expect(component.value).toBe(false);
      expect(setValueSpy).toHaveBeenCalledWith(false);
    });
  });
});
