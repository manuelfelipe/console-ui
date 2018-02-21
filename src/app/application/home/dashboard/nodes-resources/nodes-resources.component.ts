import { Component, OnInit } from '@angular/core';
import { ResourcesService } from '../../../../shared/resources/resources.service';
import { NodesResources } from '../../../../shared/resources/nodes-resources';
import { MetricService } from '../../../../shared/metric/metric.service';
import { MetricRequestFactory } from '../../../../shared/metric/metric-request.factory';
import { MetricResponseFactory } from '../../../../shared/metric/metric-response.factory';

@Component({
  selector: 'app-nodes-resources',
  templateUrl: './nodes-resources.component.html'
})
export class NodesResourcesComponent implements OnInit {

  resources: NodesResources[] = [];
  isLoading = false;

  // used in html only
  private clustersColors = {
    aws: '#FAAF34',
    gce: '#547DBF',
    azure: '#2EABE0',
  };

  constructor(private resourcesService: ResourcesService,
              private metricRequestFactory: MetricRequestFactory,
              private metricResponseFactory: MetricResponseFactory,
              private metricService: MetricService) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.resourcesService.getNodesResources().first()
      .do(resources => this.resources = resources)
      .flatMap(resources => resources)
      .map(resource => this.metricRequestFactory.toGetLatestMetricRequest(`pods_${resource.cluster}`))
      .mergeMap(request => this.metricService.getLatestMetric(request))
      .map(response => this.metricResponseFactory.toMetric(response))
      .finally(() => this.isLoading = false)
      .filter(metric => !!metric)
      .subscribe(metric => {
        const clusterResource = this.resources.filter(resource => `pods_${resource.cluster}` === metric.type)[0];

        if (clusterResource) {
          clusterResource.container = +metric.value;
        }
      });
  }
}
