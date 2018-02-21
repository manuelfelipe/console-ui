import { Component, OnInit } from '@angular/core';
import { AlertService } from '../../shared/alert/alert.service';
import { Alert } from '../../shared/alert/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html'
})
export class AlertsComponent implements OnInit {

  alerts: Alert[] = [];
  isAlertDismissed = {};

  private typesWhitelist = ['primary', 'success', 'info', 'warning', 'danger'];

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getAlerts().first()
      .subscribe(alerts => this.alerts = alerts);
  }

  // if type is not whitelisted, return 'info'
  getType(type: string): string {
    return this.typesWhitelist.includes(type) ? type : 'info';
  }
}
