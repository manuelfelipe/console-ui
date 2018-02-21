import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { find, get } from 'lodash';
import { DroneService } from '../../../../../../shared/drone/drone.service';
import { DroneSocketService } from '../../../../../../shared/drone/drone.socket';
import { DroneRequestFactory } from '../../../../../../shared/drone/drone-request.factory';
import { Log } from '../../../../../../shared/drone/log/log';
import { Build } from '../../../../../../shared/drone/build/build';
import { BuildStatus } from '../../../../../../shared/drone/build/build-status';
import { isBuildInProgress } from '../../../../../../shared/drone/drone.utils';

@Component({
  selector: 'app-build-logs',
  templateUrl: './build-logs.component.html',
  styleUrls: ['./build-logs.component.scss']
})
export class BuildLogsComponent implements OnChanges, OnDestroy {

  @Input() owner: string;
  @Input() repository: string;
  @Input() build: Build;

  logsByProcs: LogsByProcs[] = [];
  private isCollapsed = {};

  sub: Subscription;

  constructor(private droneService: DroneService,
              private droneRequestFactory: DroneRequestFactory,
              private droneSocketService: DroneSocketService) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.owner || !this.repository || !this.build) {
      return;
    }

    const currentBuild = get<Build>(changes, 'build.currentValue');
    const previousBuild = get<Build>(changes, 'build.previousValue');

    // if we just finished streaming logs, don't refetch them once done
    if (isBuildInProgress(previousBuild) && !isBuildInProgress(currentBuild)
      || this.build.status === BuildStatus.pending) {
      return;
    }

    this.sub = this.getLogs(this.owner, this.repository, this.build.number, 1)
      .filter(log => !!log && !!log.proc) // do nothing if log has no proc
      .subscribe(log => {
        const logProc = log.proc;
        const logsProc = find(this.logsByProcs, { proc: logProc });

        // add logs to their corresponding proc, or create it if it's a new proc
        if (logsProc) {
          logsProc.logs.push(log);

        } else {
          // start as expanded logs
          this.isCollapsed[logProc] = false;

          this.logsByProcs.push({
            proc: logProc,
            logs: [log]
          });
        }
      });
  }

  getLogs(owner: string, name: string, number: number, job: number): Observable<Log> {
    this.logsByProcs = [];
    this.isCollapsed = {};

    if (isBuildInProgress(this.build)) {
      return this.droneSocketService.streamBuildLogs(owner, name, number, job);

    } else {
      const request = this.droneRequestFactory.toGetBuildLogsRequest(owner, name, number, job);
      return this.droneService.getBuildLogs(request)
        .flatMap(log => log);
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

interface LogsByProcs {
  proc: string;
  logs: Log[];
}
