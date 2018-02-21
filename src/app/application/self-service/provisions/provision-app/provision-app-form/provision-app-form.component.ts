import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { getEnumeratorKeys } from '../../../../../shared/provisions/provisions.utils';
import { ProvisionAppLanguage } from '../provision-app-language';
import { ProvisionAppType } from '../provision-app-type';

@Component({
  selector: 'app-provision-app-form',
  templateUrl: './provision-app-form.component.html'
})
export class ProvisionAppFormComponent implements OnInit, OnDestroy {

  @Output() formChanged: EventEmitter<FormGroup> = new EventEmitter();

  languages: string[] = getEnumeratorKeys(ProvisionAppLanguage);
  types: string[] = getEnumeratorKeys(ProvisionAppType);

  formGroup: FormGroup;
  sub: Subscription;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      language: [this.languages[0], Validators.required],
      type: [this.types[0], Validators.required],
      enableConfig: false,
    });

    // emit initial values
    this.formChanged.emit(this.formGroup);

    // we emit the whole formGroup, to share its validity as well
    this.sub = this.formGroup.valueChanges
      .subscribe(value => this.formChanged.emit(this.formGroup));
  }

  ngOnDestroy() {
    // emit null to remove formControl
    this.formChanged.emit(null);

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
