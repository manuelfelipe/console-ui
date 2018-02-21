import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DroneService } from '../../../../../shared/drone/drone.service';
import { DroneRequestFactory } from '../../../../../shared/drone/drone-request.factory';
import { Build } from '../../../../../shared/drone/build/build';
import { BuildStatus } from '../../../../../shared/drone/build/build-status';
import { BuildResponseFactory } from '../../../../../shared/drone/build/build-response.factory';
import { BuildEvent } from '../../../../../shared/drone/build/build-event';
import { Project } from '../../../../../shared/project/project';

@Component({
  selector: 'app-latest-build',
  templateUrl: './latest-build.component.html',
  styleUrls: ['./latest-build.component.scss']
})
export class LatestBuildComponent implements OnChanges {

  @Input() project: Project;
  @Input() namespace: string;

  build: Build;
  isLoading = false;

  // used in html only
  BuildEvent = BuildEvent;
  BuildStatus = BuildStatus;

  constructor(private droneService: DroneService,
              private droneRequestFactory: DroneRequestFactory,
              private buildResponseFactory: BuildResponseFactory) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.project || changes.namespace) && this.project && this.namespace) {
      // reset values
      this.build = null;

      let branch = 'master';

      if (this.namespace.endsWith('-develop')) {
        branch = 'develop';
      }

      if (this.namespace.endsWith('-qa')) {
        branch = 'release';
      }

      const request = this.droneRequestFactory.toGetLatestBuildRequest(this.project.repository.owner, this.project.repository.name, branch);

      this.isLoading = true;
      this.droneService.getLatestBuild(request).first()
        .map(buildResponse => this.buildResponseFactory.toBuild(buildResponse))
        .subscribe(build => this.build = build, null,
          () => this.isLoading = false);
    }
  }
}
