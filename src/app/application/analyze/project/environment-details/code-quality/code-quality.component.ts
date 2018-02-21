import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { find, get } from 'lodash';
import { SonarService } from '../../../../../shared/sonar/sonar.service';
import { SonarRequestFactory } from '../../../../../shared/sonar/sonar-request.factory';
import { SonarMetrics } from '../../../../../shared/sonar/sonar-metric';
import { SonarResponseFactory } from '../../../../../shared/sonar/sonar-response.factory';
import { Project } from '../../../../../shared/project/project';

@Component({
  selector: 'app-code-quality',
  templateUrl: './code-quality.component.html',
  styleUrls: ['./code-quality.component.scss']
})
export class CodeQualityComponent implements OnChanges {

  @Input() project: Project;
  isLoading = false;

  metrics: SonarMetrics;

  // Refer to: https://docs.sonarqube.org/display/SONAR/Metric+Definitions
  private requestMetrics = `coverage, ncloc, sqale_index, alert_status, duplicated_blocks`;

  constructor(private sonarService: SonarService,
              private sonarRequestFactory: SonarRequestFactory,
              private sonarResponseProcessor: SonarResponseFactory) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.project && this.project) {
      // reset values
      this.metrics = null;

      const request = this.sonarRequestFactory
        .toGetMetricsRequest(this.project.repository.owner, this.project.repository.name, 'master', this.requestMetrics);

      this.isLoading = true;
      this.sonarService.getMetrics(request).first()
        .map(response => this.sonarResponseProcessor.toMetrics(response))
        .finally(() => this.isLoading = false)
        .subscribe(metrics => this.metrics = metrics, null);
    }
  }

  getMetric(metrics: SonarMetrics, metric: string): number {
    if (!metrics) {
      return null;
    }

    return get(find(metrics.metrics, { metric: metric }), 'value', null);
  }

  getCoverageClass(coverage: number): string {
    if (!coverage || coverage < 60) {
      return 'danger';
    }

    if (coverage >= 60 && coverage < 80) {
      return 'warning';
    }

    if (coverage >= 80) {
      return 'success';
    }
  }
}
