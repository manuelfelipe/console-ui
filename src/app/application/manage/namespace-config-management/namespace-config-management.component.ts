import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { indexOf, replace } from 'lodash';
import { ConsulService } from '../../../shared/consul/consul.service';
import { ConsulRequestFactory } from '../../../shared/consul/consul-request.factory';
import { isFolder } from '../../../shared/consul/consul.utils';
import { ProjectManager } from '../../../shared/project/project.manager';

@Component({
  selector: 'app-namespace-config-management',
  templateUrl: './namespace-config-management.component.html',
  styleUrls: ['./namespace-config-management.component.scss']
})
export class NamespaceConfigManagementComponent implements OnInit, OnDestroy {

  keys: string[] = [];
  selectedKey: string;
  isLoading = false;

  // used in html only
  isFolderUtil = isFolder;
  private environments = ['prod/', 'qa/', 'dev/'];

  sub: Subscription;

  constructor(private consulService: ConsulService,
              private consulRequestFactory: ConsulRequestFactory,
              private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = this.projectManager.project
      .filter(project => !!project)
      .subscribe(project => {
        this.selectedKey = `${project.repository.owner}/${project.repository.name}/`;
        this.onKeyClick(this.selectedKey);
      });
  }

  onKeyClick(key: string): void {
    this.selectedKey = key;

    this.keys = [];
    this.getKeys(key);
  }

  formatKey(key: string): string {
    return replace(key, this.selectedKey, '');
  }

  private getKeys(key: string): void {
    const request = this.consulRequestFactory.toGetKeysRequest(key);

    this.isLoading = true;
    this.consulService.getKeys(request).first()
      .map(keys => keys.filter(k => !!k && k !== this.selectedKey))
      .finally(() => this.isLoading = false)
      .subscribe(keys => {
        this.keys = keys;

        // show environment folders first (dev, qa, prod)
        this.keys.sort((a, b) => {
          const ap = indexOf(this.environments, this.formatKey(a));
          const bp = indexOf(this.environments, this.formatKey(b));

          return bp - ap;
        });
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
