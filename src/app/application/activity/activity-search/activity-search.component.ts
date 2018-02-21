import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ActivitySearch } from './activity-search';

@Component({
  selector: 'app-activity-search',
  templateUrl: './activity-search.component.html'
})
export class ActivitySearchComponent implements OnInit {

  @Input() namespace: string;
  user: string;
  since: NgbDateStruct;
  to: NgbDateStruct;

  formGroup: FormGroup;

  @Output() search: EventEmitter<ActivitySearch> = new EventEmitter<ActivitySearch>();

  isNamespaceDisabled = false;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    // if we already have a namespace input, disable this field
    if (this.namespace) {
      this.isNamespaceDisabled = true;
    }

    this.formGroup = this.fb.group({
      namespace: this.namespace,
      user: null,
      since: null,
      to: null,
    });
  }

  onSearch(): void {
    const values = this.formGroup.value;

    this.search.emit({
      namespace: this.namespace || values.namespace,
      user: values.user,
      since: values.since ? `${values.since.year}-${values.since.month}-${values.since.day}` : '',
      to: values.to ? `${values.to.year}-${values.to.month}-${values.to.day}` : '',
    });
  }
}
