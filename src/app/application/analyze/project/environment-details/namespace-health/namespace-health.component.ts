import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { ServiceHealth } from './service-health';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { UptimeService } from '../../../../../shared/uptime/uptime.service';
import { UptimeRequestFactory } from '../../../../../shared/uptime/uptime-request.factory';

@Component({
  selector: 'app-namespace-health',
  templateUrl: './namespace-health.component.html',
  styleUrls: ['./namespace-health.component.scss']
})
export class NamespaceHealthComponent implements OnChanges {

  @Input() namespace: string;

  serviceUrl: string;
  serviceUpstreamUrl: string;
  serviceHealth: ServiceHealth;
  serviceSLA: number = -1;

  isLoading = false;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private uptimeService: UptimeService,
              private uptimeRequestFactory: UptimeRequestFactory) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace && this.namespace) {
      // reset values
      this.serviceUrl = null;
      this.serviceUpstreamUrl = null;
      this.serviceHealth = null;
      this.serviceSLA = -1;

      const urlRequest = this.kubernetesRequestFactory.toGetServiceURLRequest(this.namespace);
      const upstreamUrlRequest = this.kubernetesRequestFactory.toGetServiceUpstreamURLRequest(this.namespace);
      const healthRequest = this.kubernetesRequestFactory.toGetServiceHealthRequest(this.namespace);

      this.isLoading = true;
      this.kubernetesService.getServiceURL(urlRequest).first()
        .do(serviceUrl => this.serviceUrl = serviceUrl.toString())
        .mergeMap(() => this.kubernetesService.getServiceUpstreamURL(upstreamUrlRequest))
        .do(upstreamUrl => this.serviceUpstreamUrl = upstreamUrl.toString())
        .finally(() => this.isLoading = false)
        .mergeMap(() => this.kubernetesService.getServiceHealth(healthRequest))
        .subscribe(isHealthy => {
          if (isHealthy) {
            this.serviceHealth = ServiceHealth.OK;
          } else {
            this.serviceHealth = ServiceHealth.NOK;
          }
        });

      const todayStartUnix = moment().startOf('day').unix(); // get unix from start of day, 12:00am
      const nowUnix = moment().unix();
      const slaRequest = this.uptimeRequestFactory.toGetSLARequest('ns', 'Ingress', this.namespace, todayStartUnix, nowUnix);

      this.uptimeService.getSLA(slaRequest).first()
        .subscribe(serviceSLA => this.serviceSLA = serviceSLA.valueOf());
    }
  }

  getStatusClass(): string {
    if (this.serviceHealth === ServiceHealth.OK) {
      return 'success';
    } else if (this.serviceHealth === ServiceHealth.NOK) {
      return 'danger';
    } else {
      return 'warning';
    }
  }

  getSLAClass(): string {
    if (this.serviceSLA > 99.8) {
      return 'success';
    } else if (this.serviceSLA > 99.6 && this.serviceSLA <= 99.8) {
      return 'warning';
    } else {
      return 'danger';
    }
  }
}
