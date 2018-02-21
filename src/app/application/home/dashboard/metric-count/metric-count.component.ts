import { Component, Input, OnInit } from '@angular/core';
import { MetricService } from '../../../../shared/metric/metric.service';
import { MetricResponseFactory } from '../../../../shared/metric/metric-response.factory';
import { MetricRequestFactory } from '../../../../shared/metric/metric-request.factory';

@Component({
  selector: 'app-metric-count',
  templateUrl: './metric-count.component.html',
  styleUrls: ['./metric-count.component.scss']
})
export class MetricCountComponent implements OnInit {

  @Input() type: string;
  @Input() title: string;
  @Input() icon: string;

  count = 0;
  counto = 0;

  constructor(private metricService: MetricService,
              private metricRequestFactory: MetricRequestFactory,
              private metricResponseFactory: MetricResponseFactory) {
  }

  ngOnInit() {
    const request = this.metricRequestFactory.toGetLatestMetricRequest(this.type);

    this.metricService.getLatestMetric(request).first()
      .map(response => this.metricResponseFactory.toMetric(response))
      .filter(metric => !!metric)
      .subscribe(metric => this.count = +metric.value);
  }
}
