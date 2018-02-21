import { Component, OnInit } from '@angular/core';
import { ToastrService } from '../../../shared/toastr/toastr.service';
import { UptimeService as UptimeServiceModel } from '../../../shared/uptime/uptime-service';
import { getUptimesStatusSeverity, UptimeSeverity } from '../../../shared/uptime/uptime.utils';
import { UptimeService } from '../../../shared/uptime/uptime.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.scss']
})
export class StatusComponent implements OnInit {

  infras: UptimeServiceModel[] = [];
  uptimeSeverity: UptimeSeverity;

  isLoading = false;

  constructor(private uptimeService: UptimeService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.uptimeService.getInfras().first()
      .finally(() => this.isLoading = false)
      .subscribe(infras => {
          this.infras = infras;
          this.uptimeSeverity = getUptimesStatusSeverity(infras);
        },
        error => this.toastr.error('Error getting infras status'));
  }
}
