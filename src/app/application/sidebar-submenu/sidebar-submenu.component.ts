import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ProjectManager } from '../../shared/project/project.manager';
import { Repository } from '../../shared/project/project';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-sidebar-submenu',
  templateUrl: './sidebar-submenu.component.html',
  styleUrls: ['./sidebar-submenu.component.scss']
})
export class SidebarSubmenuComponent implements OnInit, OnDestroy {

  @Input() opened = false;
  @Input() submenuContent: string;

  @Output() openedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  namespace: string;
  repository: Repository;
  content = {};

  sub: Subscription;

  constructor(private projectManager: ProjectManager) {
  }

  ngOnInit() {
    this.sub = Observable.combineLatest(this.projectManager.namespace, this.projectManager.project)
      .subscribe(([namespace, project]) => {
        this.namespace = namespace;

        if (project && project.repository) {
          this.repository = project.repository;
        }

        this.initURLs();
      });
  }

  initURLs(): void {
    this.content = {
      home: [
        {
          title: 'DASHBOARD',
          path: '/home',
        },
        {
          title: 'ACTIVITY',
          path: '/activity',
        },
        {
          title: 'API_CATALOG',
          path: '/api-catalog',
        },
        {
          title: 'SLA',
          path: '/sla',
        },
        {
          title: 'STATUS',
          path: '/status',
        },
        {
          title: 'TRAFFIC',
          path: '/traffic',
        },
      ],
      self_service: [
        {
          title: 'SITESPEED_JOBS',
          path: '/self-service/sitespeed',
        },
        {
          title: 'PROVISIONS',
          path: '/self-service/provisions',
        },
      ],
      manage: [
        {
          title: 'SECURITY',
          path: this.getProjectPath('manage', 'security'),
          redirect: 'manage/security',
        },
        {
          title: 'CONSUMERS',
          path: this.getProjectPath('manage', 'consumers'),
          redirect: 'manage/consumers',
        },
        {
          title: 'CONFIG_MANAGEMENT',
          path: this.getProjectPath('manage', 'config'),
          redirect: 'manage/config',
        },
        {
          title: 'SWAGGER',
          path: this.getProjectPath('manage', 'swagger'),
          redirect: 'manage/security',
        },
      ],
      analyze: [
        {
          title: 'ENVIRONMENT_DETAILS',
          path: this.getProjectPath('analyze', 'environment-details'),
          redirect: 'analyze/environment-details',
        },
        {
          title: 'ACTIVITY',
          path: this.getProjectPath('analyze', 'activity'),
          redirect: 'analyze/activity',
        },
        {
          title: 'BUILDS',
          path: this.repository ? `/analyze/builds/${this.repository.owner}/${this.repository.name}` : '/projects',
          redirect: 'analyze/builds',
        },
        {
          title: 'SLA',
          path: this.getProjectPath('analyze', 'sla'),
          redirect: 'analyze/sla',
        },
        {
          title: 'TRAFFIC',
          path: this.getProjectPath('analyze', 'traffic'),
          redirect: 'analyze/traffic',
        },
      ],
    };
  }

  getProjectPath(section: string, subsection: string): string {
    if (!this.namespace) {
      return '/projects';
    }

    return `/${section}/${this.namespace}/${subsection}`;
  }

  closeSubmenu(): void {
    this.opened = false;
    this.openedChange.emit(false);
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
