import { Component, Input } from '@angular/core';
import { Build } from '../../../../../../shared/drone/build/build';
import { DroneService } from '../../../../../../shared/drone/drone.service';
import { DroneRequestFactory } from '../../../../../../shared/drone/drone-request.factory';
import { isBuildInProgress } from '../../../../../../shared/drone/drone.utils';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-build-actions',
  templateUrl: './build-actions.component.html'
})
export class BuildActionsComponent {

  @Input() owner: string;
  @Input() repository: string;
  @Input() build: Build;

  // used in html
  isBuildInProgress = isBuildInProgress;

  constructor(private droneService: DroneService,
              private droneRequestFactory: DroneRequestFactory,
              private toastrService: ToastrService) {
  }

  restartBuild(): void {
    const request = this.droneRequestFactory.toRestartBuildRequest(this.owner, this.repository, this.build.number);

    this.droneService.restartBuild(request)
      .subscribe(() => this.toastrService.success('Build restarted'));
  }

  stopBuild(): void {
    const request = this.droneRequestFactory.toStopBuildRequest(this.owner, this.repository, this.build.number, 1);

    this.droneService.stopBuild(request)
      .subscribe(() => this.toastrService.success('Build stopped'));
  }
}
