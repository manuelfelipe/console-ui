import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { difference, findIndex, sortBy } from 'lodash';
import { getGrafanaUrl } from '../../../../shared/sitespeed/sitespeed.utils';
import { SiteSpeedService } from '../../../../shared/sitespeed/sitespeed.service';
import { KubernetesResponseFactory } from '../../../../shared/kubernetes/kubernetes-response.factory';
import { CronJob } from '../../../../shared/kubernetes/cronjob/cronjob';
import { UserManager } from '../../../../shared/user/user.manager';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { CreateSitespeedCronjobComponent } from '../create-sitespeed-cronjob/create-sitespeed-cronjob.component';
import { SiteSpeedRequestFactory } from '../../../../shared/sitespeed/sitespeed-request.factory';
import { SitespeedCronjobReportsListComponent } from '../sitespeed-cronjob-reports-list/sitespeed-cronjob-reports-list.component';

@Component({
  selector: 'app-sitespeed-cronjobs-list',
  templateUrl: './sitespeed-cronjobs-list.component.html',
  styleUrls: ['./sitespeed-cronjobs-list.component.scss']
})
export class SitespeedCronjobsListComponent implements OnInit, OnDestroy {

  username: string;
  cronjobs: CronJob[] = [];
  isCollapsed: { [key: string]: boolean } = {};

  isLoading = false;
  private sub: Subscription;

  // used in html only
  private getGrafanaUrl = getGrafanaUrl;

  constructor(private siteSpeedService: SiteSpeedService,
              private siteSpeedRequestFactory: SiteSpeedRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory,
              private userManager: UserManager,
              private toastrService: ToastrService,
              private ngbModal: NgbModal) {
  }

  ngOnInit() {
    this.isLoading = true;

    this.sub = this.userManager.user
      .filter(user => !!user)
      .subscribe(user => this.username = user.username);

    this.siteSpeedService.getCronJobs().first()
      .map(response => this.kubernetesResponseFactory.toCronJobs(response))
      .finally(() => this.isLoading = false)
      .subscribe(cronjobs => this.cronjobs = sortBy(cronjobs, ['name']),
        () => this.toastrService.error('Error getting cronjobs'));
  }

  createCronJob(): void {
    const modal: NgbModalRef = this.ngbModal.open(CreateSitespeedCronjobComponent, { size: 'lg' });

    modal.componentInstance.onCreate
      .filter(c => !!c)
      .subscribe(created => {
        // add to cronjobs list, and sort by name
        this.cronjobs.push(created);
        this.cronjobs = sortBy(this.cronjobs, ['name']);

        modal.close();
      });
  }

  editCronJob(cronjob: CronJob): void {
    const modal: NgbModalRef = this.ngbModal.open(CreateSitespeedCronjobComponent, { size: 'lg' });

    modal.componentInstance.cronjob = cronjob;
    modal.componentInstance.onCreate
      .filter(c => !!c)
      .subscribe(edited => {
        // find the edited cronjob and replace it
        const cronjobIdx = findIndex(this.cronjobs, { uid: edited.uid });
        if (cronjobIdx > -1) {
          // if cronjob already had reports loaded, keep them
          const existingCronjobsReports = this.cronjobs[cronjobIdx].reports;

          this.cronjobs[cronjobIdx] = edited;
          this.cronjobs[cronjobIdx].reports = existingCronjobsReports;
        }

        modal.close();
      });
  }

  deleteCronJob(name: string): void {
    const isConfirmed = window.confirm('Are you sure you want to delete this CronJob?');

    if (isConfirmed) {
      const request = this.siteSpeedRequestFactory.toDeleteCronJobRequest(name);
      this.siteSpeedService.deleteCronJob(request).first()
        .map(response => this.kubernetesResponseFactory.toCronJob(response))
        .subscribe((deleted) =>
            this.cronjobs = this.cronjobs.filter(cronjob => cronjob.uid !== deleted.uid),
          error => this.toastrService.error('Error deleting CronJob'));
    }
  }

  getArgsWithoutURLs(cronjob: CronJob): string[] {
    if (!cronjob) {
      return [];
    }

    return difference(cronjob.args, cronjob.urls);
  }

  toggleCronJob(cronjob: CronJob): void {
    this.isCollapsed[cronjob.uid] = !this.isCollapsed[cronjob.uid];

    // if open, load reports
    if (this.isCollapsed[cronjob.uid]) {
      const request = this.siteSpeedRequestFactory.toGetCronJobReportsRequest(cronjob.name);

      cronjob['isLoading'] = true;
      this.siteSpeedService.getCronJobReports(request).first()
        .finally(() => cronjob['isLoading'] = false)
        .subscribe(reports => cronjob.reports = reports);
    } else {
      // else, clear them
      cronjob.reports = null;
    }
  }

  viewPastReports(cronjob: CronJob): void {
    const modal: NgbModalRef = this.ngbModal.open(SitespeedCronjobReportsListComponent, { size: 'lg' });
    modal.componentInstance.cronjob = cronjob;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
