import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { getEnumeratorKeys } from '../../../../../shared/provisions/provisions.utils';
import { ProvisionDBType } from '../provision-db-type';

@Component({
  selector: 'app-provision-db-form',
  templateUrl: './provision-db-form.component.html'
})
export class ProvisionDBFormComponent implements OnInit, OnDestroy {

  @Output() formChanged: EventEmitter<FormGroup> = new EventEmitter();

  types: string[] = getEnumeratorKeys(ProvisionDBType);

  formGroup: FormGroup;
  sub: Subscription;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      type: [null],
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
