import { Component, OnInit } from '@angular/core';
import { includes, orderBy, toLower } from 'lodash';
import { UptimeService as UptimeServiceModel } from '../../../../shared/uptime/uptime-service';
import { UptimeService } from '../../../../shared/uptime/uptime.service';
import { getUptimesStatusSeverity, UptimeSeverity } from '../../../../shared/uptime/uptime.utils';

@Component({
  selector: 'app-cloud-status',
  templateUrl: './cloud-status.component.html',
  styleUrls: ['./cloud-status.component.scss']
})
export class CloudStatusComponent implements OnInit {

  infras: UptimeServiceModel[] = [];
  uptimeSeverity: UptimeSeverity;

  isLoading = false;

  constructor(private uptimeService: UptimeService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.uptimeService.getInfras().first()
      .finally(() => this.isLoading = false)
      .subscribe(infras => {
        // list `Prod` and `Kubernetes` services first, so they appear first on failing infras list
        this.infras = orderBy(infras, [
          (infra) => includes(toLower(infra.description), 'prod') || toLower(infra.kind) === 'kubernetes'
        ], ['desc']);
        this.uptimeSeverity = getUptimesStatusSeverity(infras);
      });
  }
}
