import { Component, EventEmitter, Input, OnChanges, OnDestroy, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { Subscription } from 'rxjs/Subscription';
import { forOwn, get, keys, mapValues, values } from 'lodash';
import { ConsumerPluginConfig } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugin-config';
import { ConsumerPluginsSchema } from '../../../../../../shared/kong/consumer-plugin-config/consumer-plugins-schema';
import { Consumer } from '../../../../../../shared/kong/consumer/consumer';
import { KongService } from '../../../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../../../shared/kong/kong-response.factory';
import { SchemaFieldType } from '../../../../../../shared/kong/plugin/schema';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';
import { KubernetesResponseFactory } from '../../../../../../shared/kubernetes/kubernetes-response.factory';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';

@Component({
  selector: 'app-consumer-config-form',
  templateUrl: './consumer-config-form.component.html',
  styleUrls: ['./consumer-config-form.component.scss']
})
export class ConsumerConfigFormComponent implements OnChanges, OnDestroy {

  @Input() consumer: Consumer;
  @Input() pluginName: string;
  @Input() namespace: string;
  @Output() consumerConfigCreated: EventEmitter<ConsumerPluginConfig> = new EventEmitter<ConsumerPluginConfig>();

  pluginSchema;
  configs: ConsumerPluginConfig[] = [];
  formGroup: FormGroup;

  // if plugin is `acls`, get the suffix to append to the group
  suffix: string;

  // used in html only
  SchemaFieldType = SchemaFieldType;

  sub: Subscription;

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory,
              private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory,
              private toastr: ToastrService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.pluginSchema = ConsumerPluginsSchema[this.pluginName];
    const controls: { [key: string]: FormControl } = {};

    forOwn(this.pluginSchema, (field, key) => {
      controls[key] = new FormControl(field.default, field.required ? Validators.required : []);
    });

    this.formGroup = new FormGroup(controls);

    // if it's anything else than the consumer that changed
    if ((changes.pluginName || changes.namespace) && this.namespace && this.pluginName === 'acls') {
      // reset
      this.suffix = '';

      const request = this.kubernetesRequestFactory.toGetNamespaceLabelsRequest(this.namespace);

      this.sub = this.kubernetesService.getNamespaceLabels(request)
        .map(response => this.kubernetesResponseFactory.toLabels(response))
        .subscribe(labels => {
          this.suffix = `@${labels.group}.${labels.env}`;
        });
    }
  }

  submit() {
    const username = get<string>(this.consumer, 'username');
    const controls = get(this.formGroup, 'controls');
    const config = mapValues(controls, 'value');

    const request = this.kongRequestFactory.toCreateConsumerPluginConfigRequest(username, this.pluginName, this.namespace, config);

    this.kongService.createConsumerPluginConfig(request)
      .map(this.kongResponseFactory.toConsumerPluginConfig)
      .subscribe(consumerPluginConfig => {
        this.consumerConfigCreated.emit(consumerPluginConfig);
      }, (res: Response) => {
        const body = res.json ? res.json() : res;
        const error = this.parseKongError(body);
        this.toastr.error(error.title, error.message);
      });
  }

  private parseKongError(error): { title: string, message: string } {
    let title = keys(error.data)[0];
    const message = values<string>(error.data)[0];

    if (title === 'message') {
      title = 'Error';
    }

    return {
      title: title,
      message: message || 'Error creating config!',
    };
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
