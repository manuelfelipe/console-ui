import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Response } from '@angular/http';
import { forOwn, get, isEmpty, isPlainObject, mapValues } from 'lodash';
import { KongService } from '../../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';
import { Plugin } from '../../../../shared/kong/plugin/plugin';
import { Schema, SchemaFieldType } from '../../../../shared/kong/plugin/schema';
import { ToastrService } from '../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-plugin-config-form',
  templateUrl: './plugin-config-form.component.html'
})
export class PluginConfigFormComponent implements OnChanges {

  @Input() enabledPlugin: string; // to fetch plugin's schema
  @Input() plugin: Plugin;  // to fill known configs value
  @Input() namespace: string;

  @Output() pluginModified: EventEmitter<Plugin> = new EventEmitter<Plugin>();

  schema: Schema;
  formGroup: FormGroup;

  // used in html only
  SchemaFieldType = SchemaFieldType;

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory,
              private toastr: ToastrService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.enabledPlugin) {
      const request = this.kongRequestFactory.toGetPluginSchemaRequest(this.enabledPlugin);

      this.kongService.getPluginSchema(request).first()
        .map(this.kongResponseFactory.toSchema)
        .subscribe(schema => {
          this.schema = schema;

          // generate FormGroup controls, assign defaults, validators
          this.generateFormGroupFromSchema(schema);

          // if plugin already active, patch values with its existing configs
          if (this.plugin) {
            this.patchExistingConfig(this.plugin.config);
          }
        });
    }
  }

  generateFormGroupFromSchema(schema: Schema): void {
    const fields = get(schema, 'fields');
    const controls: { [key: string]: FormControl } = {};

    forOwn(fields, (field, key) => {
      // default value, validators
      controls[key] = new FormControl(field.default, field.required ? Validators.required : []);
    });

    this.formGroup = new FormGroup(controls);
  }

  patchExistingConfig(config: any) {
    forOwn(config, (value, key) => {
      // for some reason, Kong sets empty strings on Array types as {}
      if (isPlainObject(value) && isEmpty(value)) {
        value = '';
      }

      this.formGroup.controls[key].patchValue(value);
    });
  }

  onSubmit(): void {
    const controls = get(this.formGroup, 'controls');
    const config = mapValues(controls, 'value');

    if (this.plugin) {
      // update it
      const apiId = this.namespace;
      const pluginId = this.plugin.id;
      const name = this.plugin.name;
      const request = this.kongRequestFactory.toUpdateApiPluginRequest(apiId, pluginId, name, config, true);

      this.kongService.updateApiPlugin(request).first()
        .map(this.kongResponseFactory.toPlugin)
        .subscribe(plugin => {
            this.patchExistingConfig(plugin.config);
            this.pluginModified.emit(plugin);

            this.toastr.success(plugin.name, 'Successfully updated');
          },
          (error: Response) => {
            const body = error.json ? error.json() : error;
            this.toastr.error(this.plugin.name, body);
          });
    } else {
      // add it
      const apiId = this.namespace;
      const name = this.enabledPlugin;
      const request = this.kongRequestFactory.toAddApiPluginRequest(apiId, name, config);

      this.kongService.addApiPlugin(request).first()
        .map(this.kongResponseFactory.toPlugin)
        .subscribe(plugin => {
            this.patchExistingConfig(plugin.config);
            this.pluginModified.emit(plugin);

            this.toastr.success(plugin.name, 'Successfully added');
          },
          (error: Response) => {
            const body = error.json ? error.json() : error;
            this.toastr.error(this.enabledPlugin, body);
          });
    }
  }

  disable(): void {
    if (this.plugin) {
      const apiId = this.namespace;
      const pluginId = this.plugin.id;
      const name = this.plugin.name;
      const request = this.kongRequestFactory.toUpdateApiPluginRequest(apiId, pluginId, name, {}, false);

      this.kongService.updateApiPlugin(request).first()
        .map(this.kongResponseFactory.toPlugin)
        .subscribe(plugin => {
            this.patchExistingConfig(plugin.config);
            this.pluginModified.emit(plugin);

            this.toastr.success(plugin.name, 'Successfully disabled');
          },
          (error: Response) => {
            const body = error.json ? error.json() : error;
            this.toastr.error(this.plugin.name, body);
          });
    }
  }
}
