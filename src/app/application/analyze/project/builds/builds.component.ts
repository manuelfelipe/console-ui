import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DroneService } from '../../../../shared/drone/drone.service';
import { Build } from '../../../../shared/drone/build/build';
import { BuildEvent } from '../../../../shared/drone/build/build-event';
import { BuildStatus } from '../../../../shared/drone/build/build-status';
import { DroneRequestFactory } from '../../../../shared/drone/drone-request.factory';
import { BuildResponseFactory } from '../../../../shared/drone/build/build-response.factory';
import { Contributor } from '../../../../shared/drone/build/contributor';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-builds',
  templateUrl: './builds.component.html',
  styleUrls: ['./builds.component.scss']
})
export class BuildsComponent implements OnInit, OnDestroy {

  isLoadingBuilds = false;
  isLoadingContributors = false;

  builds: Build[] = [];
  contributors: Contributor[] = [];

  // used in html only
  BuildEvent = BuildEvent;
  BuildStatus = BuildStatus;

  // just to make aot happy
  build;

  sub: Subscription;

  constructor(private droneService: DroneService,
              private buildResponseProcessor: BuildResponseFactory,
              private droneRequestFactory: DroneRequestFactory,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.sub = this.route.params
      .subscribe(params => {
        const owner = params.owner;
        const repo = params.repository;

        // reset
        this.builds = [];
        this.contributors = [];

        const buildsRequest = this.droneRequestFactory
          .toGetBuildsRequest(owner, repo);

        this.isLoadingBuilds = true;
        this.droneService.getBuilds(buildsRequest).first()
          .map(buildsResponse => this.buildResponseProcessor.toBuilds(buildsResponse))
          .finally(() => this.isLoadingBuilds = false)
          .subscribe(builds => {
            this.builds = builds;
          });

        const contributorsRequest = this.droneRequestFactory
          .toGetContributorsRequest(owner, repo);

        this.isLoadingContributors = true;
        this.droneService.getContributors(contributorsRequest).first()
          .finally(() => this.isLoadingContributors = false)
          .subscribe(contributors => this.contributors = contributors);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
