/* tslint:disable max-line-length */
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { JsonPipe } from '@angular/common';
import { routing } from './app.routing';
// NPM imports
import { Angulartics2GoogleAnalytics, Angulartics2Module } from 'angulartics2';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToasterModule } from 'angular2-toaster';
import { TranslateLoader, TranslateModule, TranslateStaticLoader } from 'ng2-translate';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { MomentModule } from 'angular2-moment';
import { MarkdownToHtmlModule } from 'markdown-to-html-pipe';
import { PrettyJsonModule, SafeJsonPipe } from 'angular2-prettyjson';
import { AceEditorModule } from 'ng2-ace-editor';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SocketIoModule } from 'ng-socket-io';
import { CountoModule } from 'angular2-counto';
import { ClipboardModule } from 'ngx-clipboard';
// Components
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { LoginComponent } from './login/login.component';
import { LoginCallbackComponent } from './login/login-callback.component';
import { SidebarModule } from 'ng-sidebar';
import { AlertsComponent } from './application/alerts/alerts.component';
import { HeaderComponent } from './header/header.component';
import { UptimeComponent } from './application/uptime/uptime.component';
import { UptimeSearchComponent } from './application/uptime/uptime-search/uptime-search.component';
import { DowntimeComponent } from './application/downtime/downtime.component';
import { DowntimeSearchComponent } from './application/downtime/downtime-search/downtime-search.component';
import { UptimeInfraComponent } from './application/home/uptime/uptime-infra/uptime-infra.component';
import { ApplicationComponent } from './application/application.component';
import { SidebarSubmenuComponent } from './application/sidebar-submenu/sidebar-submenu.component';
import { NamespacesAutocompleteComponent } from './application/analyze/namespaces-autocomplete/namespaces-autocomplete.component';
import { BuildComponent } from './application/analyze/project/builds/build/build.component';
import { BuildLogsComponent } from './application/analyze/project/builds/build/build-logs/build-logs.component';
import { NamespaceResourcesComponent } from './application/analyze/project/environment-details/namespace-resources/namespace-resources.component';
import { PodResourcesComponent } from './application/analyze/project/environment-details/pod-resources/pod-resources.component';
import { CodeQualityComponent } from './application/analyze/project/environment-details/code-quality/code-quality.component';
import { NamespaceTrafficComponent } from './application/analyze/project/namespace-traffic/namespace-traffic.component';
import { NamespaceDeploymentsComponent } from './application/analyze/project/environment-details/namespace-deployments/namespace-deployments.component';
import { NamespaceConfigMapsComponent } from './application/analyze/project/environment-details/namespace-config-maps/namespace-config-maps.component';
import { NamespaceEventsComponent } from './application/analyze/project/environment-details/namespace-events/namespace-events.component';
import { NamespaceEventsButtonComponent } from './application/analyze/project/environment-details/namespace-events-button/namespace-events-button.component';
import { NamespaceConfigManagementComponent } from './application/manage/namespace-config-management/namespace-config-management.component';
import { NamespaceConfigManagementBreadcrumbComponent } from './application/manage/namespace-config-management/namespace-config-management-breadcrumb/namespace-config-management-breadcrumb.component';
import { NamespaceConfigManagementValueComponent } from './application/manage/namespace-config-management/namespace-config-management-value/namespace-config-management-value.component';
import { NamespaceHealthComponent } from './application/analyze/project/environment-details/namespace-health/namespace-health.component';
import { NamespaceLogsComponent } from './application/analyze/project/namespace-logs/namespace-logs.component';
import { NamespaceLogsSearchComponent } from './application/analyze/project/namespace-logs/namespace-logs-search/namespace-logs-search.component';
import { UptimeNamespaceComponent } from './application/analyze/project/uptime-namespace/uptime-namespace.component';
import { ScaleDeploymentComponent } from './application/analyze/project/environment-details/namespace-deployments/scale-deployment/scale-deployment.component';
import { BuildActionsComponent } from './application/analyze/project/builds/build/build-actions/build-actions.component';
import { SelfServiceComponent } from './application/self-service/self-service.component';
import { ManageComponent } from './application/manage/manage.component';
import { AnalyzeComponent } from './application/analyze/analyze.component';
import { AdminComponent } from './application/admin/admin.component';
import { CoveragesComponent } from './application/admin/coverages/coverages.component';
import { LearnComponent } from './application/learn/learn.component';
import { DashboardComponent } from './application/home/dashboard/dashboard.component';
import { HomeComponent } from './application/home/home.component';
import { SwaggerComponent } from './application/manage/swagger/swagger.component';
import { ActivityComponent } from './application/activity/activity.component';
import { ActivitySearchComponent } from './application/activity/activity-search/activity-search.component';
import { StatusComponent } from './application/home/status/status.component';
import { TrafficComponent } from './application/home/traffic/traffic.component';
import { LanguageComponent } from './shared/language/language.component';
import { LatestBuildComponent } from './application/analyze/project/environment-details/latest-build/latest-build.component';
import { NodesResourcesComponent } from './application/home/dashboard/nodes-resources/nodes-resources.component';
import { NewsComponent } from './application/home/dashboard/news/news.component';
import { CloudStatusComponent } from './application/home/dashboard/cloud-status/cloud-status.component';
import { ProjectComponent } from './application/analyze/project/project.component';
import { ProjectsComponent } from './application/analyze/projects/projects.component';
import { BuildsComponent } from './application/analyze/project/builds/builds.component';
import { EnvironmentDetailsComponent } from './application/analyze/project/environment-details/environment-details.component';
import { MetricCountComponent } from './application/home/dashboard/metric-count/metric-count.component';
import { DeploymentsCountComponent } from './application/deployments-count/deployments-count.component';
import { PodLogsComponent } from './application/analyze/project/environment-details/namespace-deployments/pod-logs/pod-logs.component';
import { PodRestartsComponent } from './application/analyze/project/environment-details/namespace-deployments/pod-restarts/pod-restarts.component';
import { NamespaceSecurityManagementComponent } from './application/manage/namespace-security-management/namespace-security-management.component';
import { PluginConfigFormComponent } from './application/manage/namespace-security-management/plugin-config-form/plugin-config-form.component';
import { NumberCardComponent } from './shared/number-card/number-card.component';
import { FieldBooleanComponent } from './shared/fields/field-boolean/field-boolean.component';
import { ApiDetailsComponent } from './application/manage/namespace-security-management/api-details/api-details.component';
import { ConsumerConfigsComponent } from './application/manage/namespace-security-management/consumer-configs/consumer-configs.component';
import { ConsumerConfigListComponent } from './application/manage/namespace-security-management/consumer-configs/consumer-config/consumer-config-list/consumer-config-list.component';
import { ConsumerConfigFormComponent } from './application/manage/namespace-security-management/consumer-configs/consumer-config/consumer-config-form/consumer-config-form.component';
import { ApiCatalogComponent } from './application/self-service/api-catalog/api-catalog.component';
import { ApiCatalogSearchComponent } from './application/self-service/api-catalog/api-catalog-search/api-catalog-search.component';
import { SitespeedCronjobsComponent } from './application/self-service/sitespeed-cronjobs/sitespeed-cronjobs.component';
import { SitespeedCronjobsListComponent } from './application/self-service/sitespeed-cronjobs/sitespeed-cronjobs-list/sitespeed-cronjobs-list.component';
import { SitespeedCronjobReportsListComponent } from './application/self-service/sitespeed-cronjobs/sitespeed-cronjob-reports-list/sitespeed-cronjob-reports-list.component';
import { CreateSitespeedCronjobComponent } from './application/self-service/sitespeed-cronjobs/create-sitespeed-cronjob/create-sitespeed-cronjob.component';
import { CopyToClipboardComponent } from './shared/copy-to-clipboard/copy-to-clipboard.component';
import { NamespaceActivityComponent } from './application/analyze/project/namespace-activity/namespace-activity.component';
import { AllActivityComponent } from './application/home/all-activity/all-activity.component';
import { LiveButtonComponent } from './live-button/live-button.component';
import { ProvisionsComponent } from './application/self-service/provisions/provisions/provisions.component';
import { ProjectSelectionFormComponent } from './application/self-service/provisions/project-selection-form/project-selection-form.component';
import { ProvisionAppFormComponent } from './application/self-service/provisions/provision-app/provision-app-form/provision-app-form.component';
import { ProvisionDBFormComponent } from './application/self-service/provisions/provision-db/provision-db-form/provision-db-form.component';
import { ProvisionDNSFormComponent } from './application/self-service/provisions/provision-dns/provision-dns-form/provision-dns-form.component';
import { LocalDeploymentInstructionsComponent } from './application/analyze/project/environment-details/local-deployment-instructions/local-deployment-instructions.component';
// Pipes
import { BuildStatusToClassPipe } from './shared/pipes/buildStatusToClass/build-status-to-class.pipe';
import { ObjectToArrayPipe } from './shared/pipes/objectToArray/object-to-array.pipe';
import { AnsiToHtmlPipe } from './shared/pipes/ansiToHtml/ansi-to-html.pipe';
import { DecodeBase64Pipe } from './shared/pipes/decodeBase64/decode-base64.pipe';
import { TrustHtmlPipe } from './shared/pipes/trustHtml/trust-html.pipe';
import { BytesToMegabytesPipe } from './shared/pipes/bytesToMegabytes/bytes-to-megabytes.pipe';
import { MilliCoresToCoresPipe } from './shared/pipes/millicoresToCores/millicores-to-cores.pipe';
import { TruncatePipe } from './shared/pipes/truncate/truncate.pipe';
import { NaPipe } from './shared/pipes/na/na.pipe';
import { FilterByPipe } from './shared/pipes/filterBy/filter-by.pipe';
import { HighlightPipe } from './shared/pipes/highlight/highlight.pipe';
import { StartCasePipe } from './shared/pipes/startCase/start-case.pipe';
import { CronToTextPipe } from './shared/pipes/cronToText/cron-to-text.pipe';
// Providers
import { LocalStorageModule } from 'angular-2-local-storage';
import { IsLoggedInGuard } from './guards/isLoggedIn/isLoggedIn.guard';
import { IsValidTokenGuard } from './guards/isValidToken/isValidToken.guard';
import { NamespaceResolver } from './resolvers/namespace.resolver';
import { AlertService } from './shared/alert/alert.service';
import { UserManager } from './shared/user/user.manager';
import { UserService } from './shared/user/user.service';
import { UserResponseFactory } from './shared/user/user-response.factory';
import { ProjectManager } from './shared/project/project.manager';
import { ConsulService } from './shared/consul/consul.service';
import { ConsulRequestFactory } from './shared/consul/consul-request.factory';
import { SwaggerService } from './shared/swagger/swagger.service';
import { SwaggerRequestFactory } from './shared/swagger/swagger-request.factory';
import { ParamsService } from './shared/params/params.service';
import { ToastrService } from './shared/toastr/toastr.service';
import { LanguageService } from './shared/language/lang.service';
import { ResourcesService } from './shared/resources/resources.service';
import { ResourcesRequestFactory } from './shared/resources/resources-request.factory';
import { MetricService } from './shared/metric/metric.service';
import { MetricRequestFactory } from './shared/metric/metric-request.factory';
import { MetricResponseFactory } from './shared/metric/metric-response.factory';
import { NewsService } from './shared/news/news.service';
import { NewsRequestFactory } from './shared/news/news-request.factory';
import { NewsResponseFactory } from './shared/news/news-response.factory';
import { SonarService } from './shared/sonar/sonar.service';
import { SonarRequestFactory } from './shared/sonar/sonar-request.factory';
import { SonarResponseFactory } from './shared/sonar/sonar-response.factory';
import { EventService } from './shared/event/event.service';
import { EventSocketService } from './shared/event/event.socket';
import { EventRequestFactory } from './shared/event/event-request.factory';
import { SiteSpeedService } from './shared/sitespeed/sitespeed.service';
import { SiteSpeedRequestFactory } from './shared/sitespeed/sitespeed-request.factory';
import { UptimeService } from './shared/uptime/uptime.service';
import { UptimeRequestFactory } from './shared/uptime/uptime-request.factory';
import { UptimeResponseFactory } from './shared/uptime/uptime-response.factory';
import { DroneService } from './shared/drone/drone.service';
import { DroneRequestFactory } from './shared/drone/drone-request.factory';
import { DroneSocketService } from './shared/drone/drone.socket';
import { ProvisionsService } from './shared/provisions/provisions.service';
import { ProvisionsRequestFactory } from './shared/provisions/provisions-request.factory';
import { ElasticsearchService } from './shared/elasticsearch/elasticsearch.service';
import { ElasticsearchRequestFactory } from './shared/elasticsearch/elasticsearch-request.factory';
import { BuildResponseFactory } from './shared/drone/build/build-response.factory';
import { ProjectService } from './shared/project/project.service';
import { ProjectRequestFactory } from './shared/project/project-request.factory';
import { ProjectResponseFactory } from './shared/project/project-response.factory';
import { BitbucketService } from './shared/bitbucket/bitbucket.service';
import { BitbucketRequestFactory } from './shared/bitbucket/bitbucket-request.factory';
import { ConfigService } from './shared/config/config.service';
import { CostService } from './shared/cost/cost.service';
import { CostRequestFactory } from './shared/cost/cost-request.factory';
import { KongService } from './shared/kong/kong.service';
import { KongRequestFactory } from './shared/kong/kong-request.factory';
import { KongResponseFactory } from './shared/kong/kong-response.factory';
import { KubernetesService } from './shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from './shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from './shared/kubernetes/kubernetes-response.factory';
import { KubernetesSocketService } from './shared/kubernetes/kubernetes.socket';

export function createTranslateLoader(http: Http) {
  return new TranslateStaticLoader(http, './assets/i18n', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LoginCallbackComponent,
    AlertsComponent,
    HeaderComponent,
    ApplicationComponent,
    SidebarSubmenuComponent,
    DashboardComponent,
    SelfServiceComponent,
    ManageComponent,
    AnalyzeComponent,
    AdminComponent,
    CoveragesComponent,
    LearnComponent,
    NamespacesAutocompleteComponent,
    HomeComponent,
    ActivityComponent,
    ActivitySearchComponent,
    StatusComponent,
    TrafficComponent,
    LanguageComponent,
    LatestBuildComponent,
    NodesResourcesComponent,
    NewsComponent,
    CloudStatusComponent,
    ProjectComponent,
    ProjectsComponent,
    ObjectToArrayPipe,
    BuildsComponent,
    EnvironmentDetailsComponent,
    BuildComponent,
    BuildStatusToClassPipe,
    BuildLogsComponent,
    AnsiToHtmlPipe,
    DecodeBase64Pipe,
    TrustHtmlPipe,
    TruncatePipe,
    NaPipe,
    FilterByPipe,
    NamespaceResourcesComponent,
    PodResourcesComponent,
    MilliCoresToCoresPipe,
    BytesToMegabytesPipe,
    CodeQualityComponent,
    NamespaceTrafficComponent,
    NamespaceDeploymentsComponent,
    NamespaceHealthComponent,
    NamespaceEventsComponent,
    NamespaceEventsButtonComponent,
    NamespaceConfigManagementComponent,
    NamespaceConfigManagementBreadcrumbComponent,
    NamespaceConfigManagementValueComponent,
    UptimeNamespaceComponent,
    ScaleDeploymentComponent,
    PodLogsComponent,
    BuildActionsComponent,
    PodRestartsComponent,
    HighlightPipe,
    StartCasePipe,
    NamespaceSecurityManagementComponent,
    MetricCountComponent,
    PluginConfigFormComponent,
    FieldBooleanComponent,
    ApiDetailsComponent,
    ConsumerConfigsComponent,
    ConsumerConfigListComponent,
    ConsumerConfigFormComponent,
    NamespaceConfigMapsComponent,
    LoadingComponent,
    UptimeComponent,
    UptimeSearchComponent,
    DowntimeComponent,
    DowntimeSearchComponent,
    UptimeInfraComponent,
    NumberCardComponent,
    ApiCatalogComponent,
    ApiCatalogSearchComponent,
    SitespeedCronjobsComponent,
    SitespeedCronjobsListComponent,
    SitespeedCronjobReportsListComponent,
    CreateSitespeedCronjobComponent,
    CopyToClipboardComponent,
    CronToTextPipe,
    SwaggerComponent,
    NamespaceActivityComponent,
    AllActivityComponent,
    NamespaceLogsComponent,
    NamespaceLogsSearchComponent,
    LiveButtonComponent,
    DeploymentsCountComponent,
    ProvisionsComponent,
    ProjectSelectionFormComponent,
    ProvisionAppFormComponent,
    ProvisionDBFormComponent,
    ProvisionDNSFormComponent,
    AlertsComponent,
    LocalDeploymentInstructionsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing,
    Angulartics2Module.forRoot([Angulartics2GoogleAnalytics]),
    SidebarModule.forRoot(),
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [Http]
    }),
    LocalStorageModule.withConfig({
      prefix: 'thecloud',
      storageType: 'localStorage'
    }),
    DateTimePickerModule,
    Angular2FontawesomeModule,
    MomentModule,
    MarkdownToHtmlModule,
    PrettyJsonModule,
    AceEditorModule,
    NgxChartsModule,
    NgbModule.forRoot(),
    ToasterModule,
    SocketIoModule,
    CountoModule,
    ClipboardModule,
  ],
  providers: [
    IsLoggedInGuard,
    IsValidTokenGuard,
    NamespaceResolver,
    LanguageService,
    ToastrService,
    ResourcesService,
    ResourcesRequestFactory,
    MetricService,
    MetricRequestFactory,
    MetricResponseFactory,
    NewsService,
    AlertService,
    NewsRequestFactory,
    NewsResponseFactory,
    SonarService,
    SonarRequestFactory,
    SonarResponseFactory,
    EventService,
    EventRequestFactory,
    SiteSpeedService,
    SiteSpeedRequestFactory,
    UptimeService,
    UptimeRequestFactory,
    UptimeResponseFactory,
    DroneService,
    DroneRequestFactory,
    DroneSocketService,
    ProvisionsService,
    ProvisionsRequestFactory,
    ElasticsearchService,
    ElasticsearchRequestFactory,
    BuildResponseFactory,
    ProjectService,
    ProjectRequestFactory,
    ProjectResponseFactory,
    BitbucketService,
    BitbucketRequestFactory,
    CostService,
    CostRequestFactory,
    KongService,
    KongRequestFactory,
    KongResponseFactory,
    KubernetesService,
    KubernetesSocketService,
    KubernetesRequestFactory,
    KubernetesResponseFactory,
    EventSocketService,
    ConsulService,
    ConsulRequestFactory,
    SwaggerService,
    SwaggerRequestFactory,
    ConfigService,
    UserManager,
    UserService,
    UserResponseFactory,
    ProjectManager,
    ParamsService,
    ObjectToArrayPipe,
    DecodeBase64Pipe,
    MilliCoresToCoresPipe,
    BytesToMegabytesPipe,
    {
      // Override native Angular's JsonPipe
      provide: JsonPipe,
      useClass: SafeJsonPipe,
    },
  ],
  entryComponents: [
    NamespaceConfigMapsComponent,
    CreateSitespeedCronjobComponent,
    SitespeedCronjobReportsListComponent,
    LocalDeploymentInstructionsComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
