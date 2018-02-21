import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { getEnumeratorKeys } from '../../../../../shared/provisions/provisions.utils';
import { ProvisionDNSType } from '../provision-dns-type';
import { ProvisionsService } from '../../../../../shared/provisions/provisions.service';
import { ProvisionsRequestFactory } from '../../../../../shared/provisions/provisions-request.factory';

@Component({
  selector: 'app-provision-dns-form',
  templateUrl: './provision-dns-form.component.html',
  styleUrls: ['./provision-dns-form.component.scss']
})
export class ProvisionDNSFormComponent implements OnInit, OnDestroy {

  @Output() formChanged: EventEmitter<FormGroup> = new EventEmitter();

  types: string[] = getEnumeratorKeys(ProvisionDNSType);

  private lowercaseAlphaNumeric: RegExp = /^[-0-9a-z]+$/;

  formGroup: FormGroup;
  sub: Subscription;

  constructor(private provisionsService: ProvisionsService,
              private provisionsRequestFactory: ProvisionsRequestFactory,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group(
      this.initFormControls(this.types),
    );

    // emit initial values
    this.formChanged.emit(this.formGroup);

    // we emit the whole formGroup, to share its validity as well
    this.sub = this.formGroup.valueChanges
      .subscribe(value => this.formChanged.emit(this.formGroup));
  }

  initFormControls(types: string[] = []): { [key: string]: FormControl } {
    const controls: { [key: string]: FormControl } = {};

    types.forEach(type => {
      controls[type] = new FormControl({
        value: '',
        disabled: true
      }, [Validators.required, Validators.pattern(this.lowercaseAlphaNumeric)], this.validateDNS(type));
    });

    return controls;
  }

  onTypeStateChange(type: string, isChecked: boolean): void {
    if (isChecked) {
      this.formGroup.controls[type].enable();
    } else {
      this.formGroup.controls[type].disable();
    }
  }

  // if the -* or --* argument is followed by a space or arg, return false
  // only 1 argument is allowed per args array element
  validateDNS = (type: string): AsyncValidatorFn => {
    return (c: FormControl): Observable<ValidationErrors> => {
      c.markAsPristine();
      const dns = c.value;

      const request = this.provisionsRequestFactory.toCheckDNSRequest(dns, type);

      return this.provisionsService.checkDNS(request)
        .map(() => null)
        .catch(() => Observable.of({ dnsTaken: true }))
        .finally(() => c.markAsDirty());
    };
  }

  isLoading(type: string): boolean {
    return !!(this.formGroup.controls[type]
      && !this.formGroup.controls[type].dirty
      && this.formGroup.controls[type].pending);
  }

  hasSuccess(type: string): boolean {
    return !!(this.formGroup.controls[type]
      && this.formGroup.controls[type].enabled
      && this.formGroup.controls[type].dirty
      && this.formGroup.controls[type].valid);
  }

  hasWarning(type: string): boolean {
    return !!(this.formGroup.controls[type]
      && this.formGroup.controls[type].enabled
      && this.formGroup.controls[type].dirty
      && !this.formGroup.controls[type].valid);
  }

  ngOnDestroy() {
    // emit null to remove formControl
    this.formChanged.emit(null);

    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
