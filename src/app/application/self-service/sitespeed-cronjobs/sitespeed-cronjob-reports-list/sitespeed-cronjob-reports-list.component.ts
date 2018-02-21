import { Component, Input, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { Dictionary, groupBy } from 'lodash';
import { CronJob, CronJobReport } from '../../../../shared/kubernetes/cronjob/cronjob';

@Component({
  selector: 'app-sitespeed-cronjob-reports-list',
  templateUrl: './sitespeed-cronjob-reports-list.component.html'
})
export class SitespeedCronjobReportsListComponent implements OnInit {

  @Input() cronjob: CronJob;

  reports: Dictionary<CronJobReport[]>;
  date: NgbDateStruct;

  ngOnInit() {
    this.reports = this.cronjob ? this.groupReports(this.cronjob.reports) : {};
  }

  onDateSelect(date: NgbDateStruct): void {
    // if we don't have reports... don't filter
    if (!this.cronjob) {
      this.reports = null;
      return;
    }

    if (date) {
      // -1, because month starts at 0
      const selectedDate = moment(new Date(date.year, date.month - 1, date.day)).format('YYYY/MM/DD');

      // filter reports based on selected date
      const filteredReports = this.cronjob.reports
        .filter(report => moment(report.date).format('YYYY/MM/DD') === selectedDate);

      this.reports = this.groupReports(filteredReports);
    } else {
      this.reports = this.groupReports(this.cronjob.reports);
    }
  }

  private groupReports(reports: CronJobReport[]): Dictionary<CronJobReport[]> {
    return groupBy(reports, (report) => moment(report.date).format('YYYY/MM/DD'));
  }
}
