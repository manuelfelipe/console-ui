import { Component, Input } from '@angular/core';
import { orderBy } from 'lodash';
import { ToastrService } from '../../shared/toastr/toastr.service';
import { Uptime } from '../../shared/uptime/uptime';
import { UptimeSearch } from './uptime-search/uptime-search';
import { UptimeService } from '../../shared/uptime/uptime.service';
import { UptimeRequestFactory } from '../../shared/uptime/uptime-request.factory';
import { UptimeResponseFactory } from '../../shared/uptime/uptime-response.factory';

@Component({
  selector: 'app-uptime',
  templateUrl: './uptime.component.html',
  styleUrls: ['./uptime.component.scss']
})
export class UptimeComponent {

  @Input() category: string;
  @Input() kind: string;
  @Input() namespace: string;

  uptimes: Uptime[] = [];
  isLoading = false;

  constructor(private uptimeService: UptimeService,
              private uptimeRequestFactory: UptimeRequestFactory,
              private uptimeResponseFactory: UptimeResponseFactory,
              private toastr: ToastrService) {
  }

  onSearch(search: UptimeSearch): void {
    // reset
    this.uptimes = [];
    this.isLoading = true;

    const request = this.uptimeRequestFactory
      .toGetUptimesRequest(search.category, search.kind, search.namespace, search.interval, search.since, search.to);

    this.uptimeService.getUptimes(request).first()
      .map(response => this.uptimeResponseFactory.toUptimes(response))
      .finally(() => this.isLoading = false)
      .subscribe(uptimes => this.uptimes = orderBy(uptimes, ['date'], ['desc']),
        error => this.toastr.error('Error getting uptimes'));
  }
}
