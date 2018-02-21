import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { DowntimeSearch } from './downtime-search';

@Component({
  selector: 'app-downtime-search',
  templateUrl: './downtime-search.component.html'
})
export class DowntimeSearchComponent implements OnInit, OnChanges {

  @Input() category: string;
  @Input() kind: string;
  @Input() namespace: string;

  @Output() search: EventEmitter<DowntimeSearch> = new EventEmitter<DowntimeSearch>();

  since: number;
  to: number;

  // for ng-bootstrap date-picker
  sinceDatePicker: NgbDateStruct;
  toDatePicker: NgbDateStruct;

  ngOnInit() {
    const today = moment().toDate();
    const yesterday = moment().subtract(7, 'days').toDate();

    // initialize `since`
    this.sinceDatePicker = {
      year: yesterday.getUTCFullYear(),
      month: yesterday.getUTCMonth() + 1,
      day: yesterday.getUTCDate()
    };
    this.since = this.ngbDateStructToUnix(this.sinceDatePicker, 'start');

    // initialize `to`
    this.toDatePicker = {
      year: today.getUTCFullYear(),
      month: today.getUTCMonth() + 1,
      day: today.getUTCDate()
    };
    this.to = this.ngbDateStructToUnix(this.toDatePicker, 'end');

    // search
    this.onSearch();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace && !changes.namespace.firstChange) {
      this.onSearch();
    }
  }

  sinceDatePickerChanged(date: NgbDateStruct): void {
    this.since = this.ngbDateStructToUnix(date, 'start');
    this.onSearch();
  }

  toDatePickerChanged(date: NgbDateStruct): void {
    this.to = this.ngbDateStructToUnix(date, 'end');
    this.onSearch();
  }

  private ngbDateStructToUnix(date: NgbDateStruct, startOrEnd: string): number {
    if (!date) {
      return moment().startOf('day').unix();
    }

    // -1 because month starts at 0 in js Date()
    const dateAsDate: Date = new Date(date.year, date.month - 1, date.day);

    if (startOrEnd === 'start') {
      return moment(dateAsDate).startOf('day').unix();
    } else {
      return moment(dateAsDate).endOf('day').unix();
    }
  }

  onSearch(): void {
    this.search.emit({
      category: this.category,
      kind: this.kind,
      namespace: this.namespace,
      since: this.since,
      to: this.to,
    });
  }
}
