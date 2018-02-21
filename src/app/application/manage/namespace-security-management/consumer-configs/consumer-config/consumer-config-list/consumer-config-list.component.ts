import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { KongService } from '../../../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../../../shared/kong/kong-response.factory';
import { Consumer } from '../../../../../../shared/kong/consumer/consumer';
import { ConsumerPluginConfig } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugin-config';
import { ConsumerPluginsSchema } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugins-schema';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-consumer-config-list',
  templateUrl: './consumer-config-list.component.html',
  styleUrls: ['./consumer-config-list.component.scss']
})
export class ConsumerConfigListComponent implements OnInit, OnChanges {

  @Input() namespace: string;
  @Input() consumer: Consumer;
  @Input() pluginName: string;

  pluginSchema;
  configs: ConsumerPluginConfig[] = [];

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.pluginSchema = ConsumerPluginsSchema[this.pluginName];
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.namespace) {
      this.configs = [];
    }

    if (changes.consumer && this.consumer && this.pluginName) {
      const request = this.kongRequestFactory.toGetConsumerPluginConfigRequest(this.consumer.id, this.pluginName);

      this.kongService.getConsumerPluginConfig(request)
        .map(response => this.kongResponseFactory.toConsumerPluginConfigs(response.data))
        .subscribe(configs => {
          this.configs = configs
            .sort((c1, c2) => this.sortByDate(c1.createdAt, c2.createdAt));
        });
    }
  }

  deleteConsumerPluginConfig(consumerPluginConfig: ConsumerPluginConfig): void {
    const isConfirmed = confirm(`Are you sure you want to delete this config?`);

    if (isConfirmed) {
      const request = this.kongRequestFactory
        .toDeleteConsumerPluginConfigRequest(this.consumer.username, this.pluginName, consumerPluginConfig.id);

      this.kongService.deleteConsumerPluginConfig(request)
        .subscribe(() => {
          this.configs = this.configs.filter(config => config.id !== consumerPluginConfig.id);
        }, () => this.toastr.error(null, 'Error deleting config'));
    }
  }

  consumerPluginConfigCreated(consumerPluginConfig: ConsumerPluginConfig): void {
    this.configs.unshift(consumerPluginConfig);
  }

  // This is a comparison function that will result in dates being sorted in
  // DESCENDING order.
  sortByDate(d1: Date, d2: Date): number {
    if (d1 > d2) {
      return -1;
    } else if (d1 < d2) {
      return 1;
    } else {
      return 0;
    }
  }
}
