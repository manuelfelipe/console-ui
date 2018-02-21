import { Component, Input } from '@angular/core';
import { orderBy } from 'lodash';
import { Downtime } from '../../shared/uptime/downtime';
import { DowntimeSearch } from './downtime-search/downtime-search';
import { UptimeRequestFactory } from '../../shared/uptime/uptime-request.factory';
import { ToastrService } from '../../shared/toastr/toastr.service';
import { UptimeResponseFactory } from '../../shared/uptime/uptime-response.factory';
import { UptimeService } from '../../shared/uptime/uptime.service';

@Component({
  selector: 'app-downtime',
  templateUrl: './downtime.component.html',
  styleUrls: ['./downtime.component.scss']
})
export class DowntimeComponent {

  @Input() category: string;
  @Input() kind: string;
  @Input() namespace: string;

  downtimes: Downtime[] = [];
  isLoading = false;

  constructor(private uptimeService: UptimeService,
              private uptimeRequestFactory: UptimeRequestFactory,
              private uptimeResponseFactory: UptimeResponseFactory,
              private toastr: ToastrService) {
  }

  onSearch(search: DowntimeSearch): void {
    // reset
    this.downtimes = [];
    this.isLoading = true;

    const request = this.uptimeRequestFactory
      .toGetDowntimesRequest(search.category, search.kind, search.namespace, search.since, search.to);

    this.uptimeService.getDowntimes(request).first()
      .map(response => this.uptimeResponseFactory.toDowntimes(response))
      .finally(() => this.isLoading = false)
      .subscribe(downtimes => this.downtimes = orderBy(downtimes, ['downStartDate'], ['desc']),
        error => this.toastr.error('Error getting downtimes'));
  }
}
