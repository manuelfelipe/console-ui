import { Component, Input } from '@angular/core';
import { each, orderBy, uniqBy } from 'lodash';
import { UptimeSearch } from '../../../uptime/uptime-search/uptime-search';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { Uptime } from '../../../../shared/uptime/uptime';
import { UptimeService as UptimeServiceModel } from '../../../../shared/uptime/uptime-service';
import { UptimeService } from '../../../../shared/uptime/uptime.service';
import { UptimeRequestFactory } from '../../../../shared/uptime/uptime-request.factory';
import { UptimeResponseFactory } from '../../../../shared/uptime/uptime-response.factory';

@Component({
  selector: 'app-uptime-infra',
  templateUrl: './uptime-infra.component.html'
})
export class UptimeInfraComponent {

  @Input() category: string;
  @Input() kind: string;
  @Input() namespace: string;

  dates = [];
  infrasUptimes: { infra: UptimeServiceModel, uptimes: { [key: string]: Uptime } }[] = [];
  isLoading = false;

  constructor(private uptimeService: UptimeService,
              private uptimeRequestFactory: UptimeRequestFactory,
              private uptimeResponseFactory: UptimeResponseFactory,
              private toastr: ToastrService) {
  }

  onSearch(search: UptimeSearch): void {
    // reset
    this.infrasUptimes = [];
    this.dates = [];
    this.isLoading = true;

    const request = this.uptimeRequestFactory
      .toGetInfrasUptimesRequest(null, search.interval, search.since, search.to);

    this.uptimeService.getInfrasUptimes(request).first()
      .map(responses => responses.map(response => ({
        infra: response.infra,
        uptimes: this.uptimeResponseFactory.toUptimes(response.uptimes)
      })))
      .finally(() => this.isLoading = false)
      .subscribe(infrasUptimes => {
          // populate dates set with ALL our dates
          each(infrasUptimes, infrasUptime => {
            const newInfraUptime: { infra: UptimeServiceModel, uptimes: { [key: string]: Uptime } } = {
              infra: infrasUptime.infra,
              uptimes: {}
            };

            each(infrasUptime.uptimes, uptime => {
              // push all uptime's dates
              this.dates.push({ label: uptime.label, date: uptime.date });

              // put all uptimes keyed by their label
              newInfraUptime.uptimes[uptime.label] = uptime;
            });

            // push to infrasUptimes collection
            this.infrasUptimes.push(newInfraUptime);
          });

          // remove duplicates
          this.dates = uniqBy(this.dates, 'label');

          // sort the dates set
          this.dates = orderBy(this.dates, ['date'], ['desc']);
        },
        error => this.toastr.error('Error getting infras uptimes'));
  }

}
