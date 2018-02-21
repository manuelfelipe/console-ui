import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KongService } from '../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { Consumer } from '../../../../shared/kong/consumer/consumer';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';
import { ProjectManager } from '../../../../shared/project/project.manager';

@Component({
  selector: 'app-consumer-configs',
  templateUrl: './consumer-configs.component.html',
  styleUrls: ['./consumer-configs.component.scss']
})
export class ConsumerConfigsComponent implements OnInit, OnDestroy {

  namespace: string;

  consumers: Consumer[] = [];
  selectedConsumer: Consumer;

  sub: Subscription;

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory,
              private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = this.projectManager.namespace
      .filter(namespace => !!namespace)
      // reset
      .do(() => {
        this.consumers = [];
        this.selectedConsumer = null;
      })
      .do(namespace => this.namespace = namespace)
      .map(namespace => this.kongRequestFactory.toGetConsumersByNamespaceRequest(this.namespace))
      .mergeMap(request => this.kongService.getConsumersByNamespace(request))
      .map(response => this.kongResponseFactory.toConsumers(response.data))
      // get new consumers and consumers' plugin configs
      .subscribe(consumers => {
        this.consumers = consumers;

        // select first consumer by default
        if (this.consumers && this.consumers.length > 0) {
          this.selectConsumer(this.consumers[0]);
        }
      });
  }

  selectConsumer(consumer: Consumer): void {
    this.selectedConsumer = consumer;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
