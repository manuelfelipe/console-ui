import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { each, find } from 'lodash';
import { LineChart } from '../../../../../shared/charts/line-chart';
import { MilliCoresToCoresPipe } from '../../../../../shared/pipes/millicoresToCores/millicores-to-cores.pipe';
import { BytesToMegabytesPipe } from '../../../../../shared/pipes/bytesToMegabytes/bytes-to-megabytes.pipe';
import { ResourcesService } from '../../../../../shared/resources/resources.service';
import { ResourcesRequestFactory } from '../../../../../shared/resources/resources-request.factory';

@Component({
  selector: 'app-pod-resources',
  templateUrl: './pod-resources.component.html'
})
export class PodResourcesComponent implements OnChanges, OnDestroy {

  @Input() cluster: string;
  @Input() namespace: string;
  @Input() pod: string;

  isLoading = false;
  resources: { type: string, data: LineChart[] }[] = [];

  // used in html only
  clustersColors = [
    {
      name: 'aws',
      value: '#FAAF34'
    },
    {
      name: 'gce',
      value: '#547DBF'
    },
    {
      name: 'azure',
      value: '#2EABE0'
    }
  ];

  sub: Subscription;

  constructor(private resourcesService: ResourcesService,
              private resourcesRequestFactory: ResourcesRequestFactory,
              private bytesToMegabytesPipe: BytesToMegabytesPipe,
              private milliCoresToCoresPipe: MilliCoresToCoresPipe) {
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset values
    this.resources = [];

    this.sub = Observable.interval(30000)
      .startWith(0)
      .do(() => this.isLoading = true)
      .map(() => this.resourcesRequestFactory.toGetPodResourcesRequest(this.cluster, this.namespace, this.pod))
      .switchMap(request => this.resourcesService.getPodResources(request))
      .finally(() => this.isLoading = false)
      .map(resources => resources.map(resource => ({
        type: resource.type,
        data: [{
          name: this.cluster,
          series: resource.data.metrics.map(metric => ({
            name: this.getFormattedDate(new Date(metric.timestamp)),
            value: this.getValue(resource.type, metric.value),
          }))
        }]
      })))
      .subscribe(resources => {
        each(resources, (resourceType) => {
          const existingResourceType = find(this.resources, { type: resourceType.type });

          if (existingResourceType) {
            existingResourceType.data = resourceType.data;
          } else {
            this.resources.push(resourceType);
          }
        });

        // done
        this.isLoading = false;
      });
  }

  getValue(type: string, value: number): number {
    if (type === 'memory') {
      return this.bytesToMegabytesPipe.transform(value);
    } else if (type === 'cpu') {
      return this.milliCoresToCoresPipe.transform(value);
    } else {
      return value;
    }
  }

  // return into format `9h04`
  getFormattedDate(date: Date): string {
    date = date || new Date();  // default to today's date
    return `${date.getHours()}h${('0' + date.getMinutes()).slice(-2)}`;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
