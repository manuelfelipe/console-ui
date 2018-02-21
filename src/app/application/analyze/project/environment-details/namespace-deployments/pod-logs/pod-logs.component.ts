import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import * as moment from 'moment';
import { KubernetesSocketService } from '../../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';

@Component({
  selector: 'app-pod-logs',
  templateUrl: './pod-logs.component.html',
  styleUrls: ['./pod-logs.component.scss']
})
export class PodLogsComponent implements OnInit, OnDestroy {

  logs: string[] = [];
  isLiveTail = true;
  isPrevious = false;
  MAX_LOGS = 5000;

  filterMode: 'include' | 'exclude' = 'exclude';
  filterText = '/health';
  filterModes: ('include' | 'exclude')[] = ['include', 'exclude'];

  sub: Subscription;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesSocketService: KubernetesSocketService,
              private toastr: ToastrService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    Observable.combineLatest(this.route.params, this.route.queryParams).first()
      .mergeMap(([params, queryParams]) => {
        this.isPrevious = queryParams.previous;

        if (this.isPrevious) {
          this.isLiveTail = false;

          const request = this.kubernetesRequestFactory
            .toGetPodLogsRequest(params.cluster, params.namespace, params.pod, queryParams.container, this.isPrevious);

          return this.kubernetesService.getPodLogs(request).first()
            .flatMap(logs => logs);
        } else {
          return this.kubernetesSocketService.streamPodLogs(params.cluster, params.namespace, params.pod, queryParams.container);
        }
      })
      .map(this.parseTimestamp)
      .subscribe(log => {
        this.logs.push(log);

        if (this.isLiveTail) {
          this.scrollToBottom();
        }
      }, () => this.toastr.error('Error getting logs', 'They might not be available anymore'));

    // every 2 seconds, remove older logs
    this.sub = Observable.interval(2000)
      .subscribe(() => this.cleanLogs());
  }

  // keep only MAX_LOGS last logs at all time
  cleanLogs(): void {
    const logsCount = this.logs.length;

    if (logsCount > this.MAX_LOGS) {
      const nbrOfLogsToDelete = logsCount - this.MAX_LOGS;
      this.logs.splice(0, nbrOfLogsToDelete);
    }
  }

  toggleLiveTail(): void {
    this.isLiveTail = !this.isLiveTail;

    if (this.isLiveTail) {
      this.scrollToBottom();
    }
  }

  scrollToBottom(): void {
    // setTimeout seems to be required...
    setTimeout(() => window.scrollTo(0, document.body.scrollHeight));
  }

  trackByLogId(index: number): number {
    return index;
  }

  // a log line looks like this:
  // 2017-09-28T16:23:17.491052676Z [32minfo[39m: 10.18.21.2 - - [28/Sep/2017:16:23:17 +0000] "POST /api/elasticsearch/search"
  // parse its timestamp to display it differently
  private parseTimestamp(log: string): string {

    const timestampRegex = /^((\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})\.\d{5,10}Z)/;
    const timestampMatches = log.match(timestampRegex);

    if (timestampMatches && timestampMatches[0]) {
      // note that we don't use moment.utc(), we want local time
      const date = moment(timestampMatches[0]).format('YYYY/MM/DD HH:mm');

      return log.replace(timestampMatches[0], `<span class="text-info">${date}</span>`);
    } else {
      return log;
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
