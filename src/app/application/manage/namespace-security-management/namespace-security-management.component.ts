import { Component, OnDestroy, OnInit } from '@angular/core';
import { KongService } from '../../../shared/kong/kong.service';
import { KongRequestFactory } from '../../../shared/kong/kong-request.factory';
import { Plugin } from '../../../shared/kong/plugin/plugin';
import { KongResponseFactory } from '../../../shared/kong/kong-response.factory';
import { EnabledPlugins } from '../../../shared/kong/enabled-plugins/enabled-plugins';
import { ProjectManager } from '../../../shared/project/project.manager';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-namespace-security-management',
  templateUrl: './namespace-security-management.component.html',
  styleUrls: ['./namespace-security-management.component.scss']
})
export class NamespaceSecurityManagementComponent implements OnInit, OnDestroy {

  namespace: string;

  plugins: { [key: string]: Plugin } = {};
  enabledPlugins: EnabledPlugins;
  isCollapsed: { [key: string]: boolean } = {};

  isLoading = false;

  // just to make aot happy
  enabledPlugin;

  sub: Subscription;

  constructor(private kongService: KongService,
              private kongRequestFactory: KongRequestFactory,
              private kongResponseFactory: KongResponseFactory,
              private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.kongService.getEnabledPlugins().first()
      .subscribe(enabledPlugins => this.enabledPlugins = enabledPlugins);

    this.sub = this.projectManager.namespace
      .filter(namespace => !!namespace)
      .do(namespace => this.namespace = namespace)
      .do(() => { // reset
        this.plugins = {};
        this.isCollapsed = {};
      })
      .map(namespace => this.kongRequestFactory.toGetApiPluginsRequest(namespace))
      .do(() => this.isLoading = true) // isLoading: true
      .mergeMap(request => this.kongService.getApiPlugins(request))
      .filter(listResponse => !!listResponse)
      .do(() => this.isLoading = false)
      .map(listResponse => listResponse.data)
      .map(pluginsResponse => this.kongResponseFactory.toPlugins(pluginsResponse))
      .subscribe(plugins => {
        plugins.forEach(plugin => {
          this.plugins[plugin.name] = plugin;
        });

      }, () => this.isLoading = false);
  }

  // invoked by received event of plugin-config-form component
  pluginModified(plugin: Plugin) {
    this.plugins[plugin.name] = plugin;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
