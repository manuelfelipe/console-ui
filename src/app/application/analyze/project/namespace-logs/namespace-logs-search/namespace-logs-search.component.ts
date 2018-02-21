import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { NamespaceLogsSearch } from './namespace-logs-search';

@Component({
  selector: 'app-namespace-logs-search',
  templateUrl: './namespace-logs-search.component.html',
  styleUrls: ['./namespace-logs-search.component.scss']
})
export class NamespaceLogsSearchComponent implements OnInit {

  formGroup: FormGroup;
  oneDayInMillis: number = 24 * 60 * 60 * 1000;
  alphaNumericRegex: RegExp = /^[\w \d]+$/; // characters, numbers, spaces

  // in SemaText, we keep logs for 7 days only
  minDateTime: Date = moment().subtract(7, 'days').startOf('day').toDate();
  maxDateTime: Date = moment().endOf('day').toDate();

  @Output() search: EventEmitter<NamespaceLogsSearch> = new EventEmitter<NamespaceLogsSearch>();

  sub: Subscription;

  constructor(private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formGroup = this.fb.group({
      namespace: ['', Validators.required],
      searchText: ['', Validators.pattern(this.alphaNumericRegex)],
      sinceDate: [moment().subtract(1, 'day').toDate(), Validators.required],
      toDate: [moment().endOf('day').toDate(), Validators.required],
    });

    // whenever we change a value in the form, search again
    this.sub = this.formGroup.valueChanges
      .filter(() => this.formGroup.valid)
      .distinctUntilChanged()
      .debounceTime(200)
      .subscribe(() => this.emitSearch());

    // grab namespace and ?q=searchText from url
    this.route.queryParams.first()
      .do(queryParams => {
        if (queryParams.q) {
          this.formGroup.patchValue({ searchText: queryParams.q }, { emitEvent: false });
        }

        if (queryParams.since) {
          this.formGroup.patchValue({ sinceDate: new Date(+queryParams.since) }, { emitEvent: false });
        }

        if (queryParams.to) {
          this.formGroup.patchValue({ toDate: new Date(+queryParams.to) }, { emitEvent: false });
        }
      })
      .switchMap(() => this.route.params)
      .map(params => params.namespace)
      .subscribe(namespace => this.formGroup.patchValue({ namespace }));
  }

  // if we selected a sinceDate later than toDate, update toDate accordingly
  onSinceDateSelect(sinceDate: Date): void {
    const sinceDateTime: number = sinceDate.getTime();
    const toDateTime: number = this.formGroup.value.toDate.getTime();

    if (toDateTime < sinceDateTime) {
      this.formGroup.patchValue({ toDate: new Date(sinceDateTime + this.oneDayInMillis) });
    }
  }

  // if we selected a toDate earlier than sinceDate, update sinceDate accordingly
  onToDateSelect(toDate: Date): void {
    const sinceDateTime: number = this.formGroup.value.sinceDate.getTime();
    const toDateTime: number = toDate.getTime();

    if (sinceDateTime > toDateTime) {
      this.formGroup.patchValue({ sinceDate: new Date(toDateTime - this.oneDayInMillis) });
    }
  }

  emitSearch(): void {
    const values = this.formGroup.value;

    this.search.emit({
      namespace: values.namespace,
      searchText: values.searchText,
      since: values.sinceDate.getTime(),
      to: values.toDate.getTime(),
    });
  }
}
