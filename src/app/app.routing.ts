import { ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { ApplicationComponent } from './application/application.component';
import { IsValidTokenGuard } from './guards/isValidToken/isValidToken.guard';
import { IsLoggedInGuard } from './guards/isLoggedIn/isLoggedIn.guard';
import { LoginCallbackComponent } from './login/login-callback.component';
import { ManageComponent } from './application/manage/manage.component';
import { AnalyzeComponent } from './application/analyze/analyze.component';
import { AdminComponent } from './application/admin/admin.component';
import { LearnComponent } from './application/learn/learn.component';
import { BuildComponent } from './application/analyze/project/builds/build/build.component';
import { PodLogsComponent } from './application/analyze/project/environment-details/namespace-deployments/pod-logs/pod-logs.component';
import { NamespaceEventsComponent } from './application/analyze/project/environment-details/namespace-events/namespace-events.component';
import { DashboardComponent } from './application/home/dashboard/dashboard.component';
import { UptimeInfraComponent } from './application/home/uptime/uptime-infra/uptime-infra.component';
import { StatusComponent } from './application/home/status/status.component';
import { TrafficComponent } from './application/home/traffic/traffic.component';
import { SitespeedCronjobsComponent } from './application/self-service/sitespeed-cronjobs/sitespeed-cronjobs.component';
import { ProjectsComponent } from './application/analyze/projects/projects.component';
import { NamespaceSecurityManagementComponent } from './application/manage/namespace-security-management/namespace-security-management.component';
import { ConsumerConfigsComponent } from './application/manage/namespace-security-management/consumer-configs/consumer-configs.component';
import { NamespaceConfigManagementComponent } from './application/manage/namespace-config-management/namespace-config-management.component';
import { EnvironmentDetailsComponent } from './application/analyze/project/environment-details/environment-details.component';
import { BuildsComponent } from './application/analyze/project/builds/builds.component';
import { NamespaceTrafficComponent } from './application/analyze/project/namespace-traffic/namespace-traffic.component';
import { SwaggerComponent } from './application/manage/swagger/swagger.component';
import { NamespaceResolver } from './resolvers/namespace.resolver';
import { UptimeNamespaceComponent } from './application/analyze/project/uptime-namespace/uptime-namespace.component';
import { NamespaceActivityComponent } from './application/analyze/project/namespace-activity/namespace-activity.component';
import { AllActivityComponent } from './application/home/all-activity/all-activity.component';
import { NamespaceLogsComponent } from './application/analyze/project/namespace-logs/namespace-logs.component';
import { ApiCatalogComponent } from './application/self-service/api-catalog/api-catalog.component';
import { ProvisionsComponent } from './application/self-service/provisions/provisions/provisions.component';

const IS_VALID_USER_GUARDS = [IsValidTokenGuard, IsLoggedInGuard];

const appRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home',
    data: { isProjectContextual: false },
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'loginCallback',
    component: LoginCallbackComponent,
  },
  {
    path: 'analyze/:namespace/logs',
    component: NamespaceLogsComponent,
    canActivate: IS_VALID_USER_GUARDS,
  },
  {
    path: ':cluster/:namespace/:pod/logs',
    component: PodLogsComponent,
    canActivate: IS_VALID_USER_GUARDS,
  },
  {
    path: ':cluster/:namespace/events',
    component: NamespaceEventsComponent,
    canActivate: IS_VALID_USER_GUARDS,
  },
  {
    path: 'analyze/builds/:owner/:repository/:build',
    component: BuildComponent,
    canActivate: IS_VALID_USER_GUARDS,
  },
  {
    path: '',
    component: ApplicationComponent,
    canActivate: IS_VALID_USER_GUARDS,
    children: [
      // For when no project selected yet
      {
        path: 'projects',
        component: ProjectsComponent,
      },
      // builds live within Analyze, but we don't want to show namespace in url...
      {
        path: 'analyze/builds/:owner/:repository',
        component: BuildsComponent,
        canActivate: IS_VALID_USER_GUARDS,
        data: { isProjectContextual: true },
      },
      // HOME
      {
        path: 'home',
        pathMatch: 'full',
        component: DashboardComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'activity',
        pathMatch: 'full',
        component: AllActivityComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'api-catalog',
        component: ApiCatalogComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'api-catalog/:namespace',
        component: SwaggerComponent,
        data: { isProjectContextual: true },
        resolve: {
          namespace: NamespaceResolver,
        },
      },
      {
        path: 'sla',
        pathMatch: 'full',
        component: UptimeInfraComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'status',
        pathMatch: 'full',
        component: StatusComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'traffic',
        pathMatch: 'full',
        component: TrafficComponent,
        data: { isProjectContextual: false },
      },
      // SELF-SERVE
      {
        path: 'self-service/sitespeed',
        component: SitespeedCronjobsComponent,
        data: { isProjectContextual: false },
      },
      {
        path: 'self-service/provisions',
        component: ProvisionsComponent,
        data: { isProjectContextual: false },
      },
      // MANAGE
      {
        path: 'manage/:namespace',
        component: ManageComponent,
        data: { isProjectContextual: true },
        resolve: {
          namespace: NamespaceResolver,
        },
        children: [
          {
            path: 'security',
            component: NamespaceSecurityManagementComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'consumers',
            component: ConsumerConfigsComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'config',
            component: NamespaceConfigManagementComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'swagger',
            component: SwaggerComponent,
            data: { isProjectContextual: true },
          },
        ],
      },
      {
        path: 'analyze/:namespace',
        component: AnalyzeComponent,
        data: { isProjectContextual: true },
        resolve: {
          namespace: NamespaceResolver,
        },
        children: [
          {
            path: 'environment-details',
            component: EnvironmentDetailsComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'activity',
            component: NamespaceActivityComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'sla',
            component: UptimeNamespaceComponent,
            data: { isProjectContextual: true },
          },
          {
            path: 'traffic',
            component: NamespaceTrafficComponent,
            data: { isProjectContextual: true },
          },
        ],
      },
      // ADMIN
      {
        path: 'admin',
        component: AdminComponent,
        data: { isProjectContextual: false },
      },
      // LEARN
      {
        path: 'learn',
        component: LearnComponent,
        data: { isProjectContextual: false },
      },
    ],
  },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
