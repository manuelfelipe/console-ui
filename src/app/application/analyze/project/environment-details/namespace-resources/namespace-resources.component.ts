import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { each, find } from 'lodash';
import { ResourcesService } from '../../../../../shared/resources/resources.service';
import { ResourcesRequestFactory } from '../../../../../shared/resources/resources-request.factory';
import { LineChart, LineChartValue } from '../../../../../shared/charts/line-chart';
import { BytesToMegabytesPipe } from '../../../../../shared/pipes/bytesToMegabytes/bytes-to-megabytes.pipe';
import { MilliCoresToCoresPipe } from '../../../../../shared/pipes/millicoresToCores/millicores-to-cores.pipe';

@Component({
  selector: 'app-namespace-resources',
  templateUrl: './namespace-resources.component.html'
})
export class NamespaceResourcesComponent implements OnChanges, OnDestroy {

  @Input() namespace: string;
  resources: { type: string, data: LineChart[] }[] = [];
  isLoading = false;

  // used in html only
  private clustersColors = [
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
    if (changes.namespace && this.namespace) {
      // reset values
      this.resources = [];

      this.sub = Observable.interval(30000)
        .startWith(0)
        .do(() => this.isLoading = true)
        .map(() => this.resourcesRequestFactory.toGetNamespaceResourcesRequest(this.namespace))
        .switchMap(request => this.resourcesService.getNamespaceResources(request))
        .finally(() => this.isLoading = false)
        .subscribe(namespaceResources => {
          const resources: { type: string, data: LineChart[] }[] = [];

          // Let's construct our resources object in the form of: [{
          //  name: timestamp,
          //  series: [{ name: aws, value: 15 }, { name: gce, value: 42 }]
          // }]
          each(namespaceResources, (namespaceResource) => {
            each(namespaceResource.resources, (resource) => {
              each(resource.data.metrics, (metric) => {
                let resourceType = find(resources, { type: resource.type });

                // if not found, add it with empty data
                if (!resourceType) {
                  resourceType = {
                    type: resource.type,
                    data: [],
                  };

                  resources.push(resourceType);
                }

                const timestamp = new Date(metric.timestamp);
                const formattedTimestamp = this.getFormattedDate(timestamp);

                let timestampResources: LineChart = find(resourceType.data, { name: formattedTimestamp });
                const newTimestampResource: LineChartValue = {
                  name: namespaceResource.cluster,
                  value: this.getValue(resource.type, metric.value),
                };

                // if not found, add it with empty set
                if (!timestampResources) {
                  timestampResources = {
                    name: formattedTimestamp,
                    series: [],
                    timestamp,  // to be able to sort by date
                  };

                  resourceType.data.push(timestampResources);
                }

                timestampResources.series.push(newTimestampResource);
              });
            });
          });

          // finally, sort by oldest to newest
          // and replace older data
          each(resources, (resourceType) => {
            const existingResourceType = find(this.resources, { type: resourceType.type });

            resourceType.data = resourceType.data
              .sort((s1, s2) => this.sortByDate(s1.timestamp, s2.timestamp));

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

  // This is a comparison function that will result in dates being sorted in
  // DESCENDING order.
  sortByDate(d1: Date, d2: Date): number {
    if (d1 > d2) {
      return 1;
    } else if (d1 < d2) {
      return -1;
    } else {
      return 0;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
