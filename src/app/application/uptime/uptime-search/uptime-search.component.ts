import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { UptimeSearch } from './uptime-search';
import { UptimeInterval } from '../../../shared/uptime/uptime-interval';

@Component({
  selector: 'app-uptime-search',
  templateUrl: './uptime-search.component.html'
})
export class UptimeSearchComponent implements OnChanges {

  @Input() category: string;
  @Input() kind: string;
  @Input() namespace: string;

  @Output() search: EventEmitter<UptimeSearch> = new EventEmitter<UptimeSearch>();

  interval: UptimeInterval = UptimeInterval.daily;
  since: number;
  to: number;

  // for ng-bootstrap date-picker
  // private sinceDatePicker: NgbDateStruct;
  // private toDatePicker: NgbDateStruct;

  // used in html only
  UptimeInterval = UptimeInterval;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace) {
      this.selectDaily();
    }
  }

  selectDaily(): void {
    this.interval = UptimeInterval.daily;

    // since 11 days ago, to yesterday
    this.since = moment.utc().subtract(11, 'days').startOf('day').unix();
    this.to = moment.utc().subtract(1, 'day').endOf('day').unix();

    this.onSearch();
  }

  selectWeekly(): void {
    this.interval = UptimeInterval.weekly;

    // since 5 weeks ago, to last week
    this.since = moment.utc().subtract(5, 'weeks').startOf('week').unix();
    this.to = moment.utc().subtract(1, 'week').endOf('week').unix();

    this.onSearch();
  }

  selectMonthly(): void {
    this.interval = UptimeInterval.monthly;

    // since 6 month ago, to last month
    this.since = moment.utc().subtract(6, 'months').startOf('month').unix();
    this.to = moment.utc().subtract(1, 'month').endOf('month').unix();

    this.onSearch();
  }

  onSearch(): void {
    this.search.emit({
      category: this.category,
      kind: this.kind,
      namespace: this.namespace,
      interval: this.interval,
      since: this.since,
      to: this.to,
    });
  }
}
