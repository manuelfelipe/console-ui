import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DroneRequestFactory } from '../../../../../shared/drone/drone-request.factory';
import { BuildResponseFactory } from '../../../../../shared/drone/build/build-response.factory';
import { DroneService } from '../../../../../shared/drone/drone.service';
import { Build } from '../../../../../shared/drone/build/build';
import { BuildStatus } from '../../../../../shared/drone/build/build-status';
import { DroneSocketService } from '../../../../../shared/drone/drone.socket';
import { BuildEvent } from '../../../../../shared/drone/build/build-event';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.scss']
})
export class BuildComponent implements OnInit {

  owner: string;
  repository: string;
  build: Build;

  // used in html only
  BuildEvent = BuildEvent;
  BuildStatus = BuildStatus;

  constructor(private droneService: DroneService,
              private droneSocketService: DroneSocketService,
              private buildResponseProcessor: BuildResponseFactory,
              private droneRequestFactory: DroneRequestFactory,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(params => {
        this.owner = params['owner'];
        this.repository = params['repository'];
        const buildNumber = params['build'];

        this.watchBuild(this.owner, this.repository, buildNumber);

        const request = this.droneRequestFactory.toGetBuildRequest(this.owner, this.repository, buildNumber);

        this.droneService.getBuild(request)
          .map(buildResponse => this.buildResponseProcessor.toBuild(buildResponse))
          .subscribe(build => this.build = build);
      });
  }

  watchBuild(owner, repository, number): void {
    this.droneSocketService.streamBuildFeed(owner, repository, number)
      .map(response => this.buildResponseProcessor.toBuild(response))
      .subscribe(build => this.build = build);
  }

}
