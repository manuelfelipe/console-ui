import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-field-boolean',
  templateUrl: './field-boolean.component.html',
  styleUrls: ['./field-boolean.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldBooleanComponent),
      multi: true
    }
  ]
})
export class FieldBooleanComponent implements ControlValueAccessor {

  @Input() label = 'Enable';
  @Input() value = false;

  onChange: Function = () => ({});
  onTouched: Function = () => ({});

  setValue(bool: boolean) {
    this.value = bool;

    this.onChange(bool);
    this.onTouched();
  }

  registerOnChange(fn) {
    this.onChange = fn;
  }

  registerOnTouched(fn) {
    this.onTouched = fn;
  }

  writeValue(bool: boolean) {
    this.setValue(bool);
  }

  toggle() {
    this.setValue(!this.value);
  }

}
