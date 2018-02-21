import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { each, filter, find } from 'lodash';
import { ToastrService } from '../../../../shared/toastr/toastr.service';
import { ElasticsearchService } from '../../../../shared/elasticsearch/elasticsearch.service';
import { Log } from '../../../../shared/elasticsearch/log';
import { NamespaceLogsSearch } from './namespace-logs-search/namespace-logs-search';
import {
  ElasticsearchRequestFactory,
  Order,
  RangeType
} from '../../../../shared/elasticsearch/elasticsearch-request.factory';

// when logs arrive, we perform different action, based on whether we scrolled up, down, or searched
type Action = 'OVERWRITE' | 'APPEND' | 'PREPEND' | 'REVERSE' | 'SCROLL_TO_TOP' | 'SCROLL_TO_VIEW' | 'SCROLL_TO_BOTTOM';

@Component({
  selector: 'app-namespace-logs',
  templateUrl: './namespace-logs.component.html',
  styleUrls: ['./namespace-logs.component.scss']
})
export class NamespaceLogsComponent implements OnInit, OnDestroy {

  searchRequest: NamespaceLogsSearch;
  logs: Log[] = [];

  // when we need to prepend/append, this is the log we want to keep in view
  scrollToViewLog: string;
  MAX_LOGS = 5000;

  isLoadingTop = false;
  isLiveTail = true;

  // we want to highlight our text only when new search is performed
  toHighlight: string;

  sub: Subscription;

  // for testing sorting only
  erredLog: string;

  constructor(private elasticsearchService: ElasticsearchService,
              private elasticsearchRequestFactory: ElasticsearchRequestFactory,
              private toastr: ToastrService,
              private router: Router) {
  }

  ngOnInit() {
    this.sub = Observable.interval(3000)
      .filter(() => this.isLiveTail)
      .subscribe(() => this.getLatestLogs());
  }

  onSearch(searchRequest: NamespaceLogsSearch): void {
    // cache the searchRequest so we can keep live tailing
    this.searchRequest = searchRequest;
    this.doSearch(searchRequest, null, 'desc', ['OVERWRITE', 'REVERSE', 'SCROLL_TO_BOTTOM'], null);
  }

  doSearch(searchRequest: NamespaceLogsSearch, rangeType: RangeType, order: Order, actions: Action[], timestamp): void {
    const request = this.elasticsearchRequestFactory
      .toGetLogsRequest(searchRequest.namespace, searchRequest.searchText, timestamp, rangeType, order, searchRequest.since, searchRequest.to);

    // if we want to PREPEND, it means we scrolled up
    if (actions.includes('PREPEND')) {
      this.isLoadingTop = true;
    }

    this.elasticsearchService.getLogs(request).first()
      .finally(() => this.isLoadingTop = false)
      .subscribe(logs => {
        this.updateLogsView(logs, actions, order);
        this.toHighlight = searchRequest.searchText;

        const queryParams: Params = {
          q: searchRequest.searchText,
          since: searchRequest.since,
          to: searchRequest.to,
        };

        // modify queryParams, so we can easily go back to current search, or share the link
        this.router.navigate([], { queryParams });
      }, () => this.toastr.error('Error fetching logs'));
  }

  // will loop through all logs, and check if timestamp are correctly in order
  // used for testing only!
  // checkLogs() {
  //   for (let i = 0; i < this.logs.length; ++i) {
  //     const log = this.logs[i];
  //     const nextLog = this.logs[i + 1];
  //
  //     // if not already the last one
  //     if (nextLog) {
  //       if (new Date(log._source['@timestamp']).getTime() > new Date(nextLog._source['@timestamp']).getTime()) {
  //         console.log(new Date(log._source['@timestamp']).getTime(), 'CAME BEFORE', new Date(nextLog._source['@timestamp']).getTime());
  //         this.erredLog = log._id;
  //         // return;
  //       }
  //     }
  //   }
  // }

  updateLogsView(logs: Log[], actions: Action[], order: Order): void {
    if (actions.includes('REVERSE')) {
      logs.reverse();
    }

    if (actions.includes('OVERWRITE')) {
      this.logs = logs;
    }

    if (actions.includes('PREPEND')) {
      // remove duplicates first
      logs = this.removeDuplicates(logs);

      // keep the top-most log in view
      this.scrollToViewLog = this.logs[0] ? this.logs[0]._id : null;

      // add at beginning of array
      each(logs, log => {
        this.logs.unshift(log);
      });

      this.cleanLogs('PREPEND');
    }

    if (actions.includes('APPEND')) {
      // remove duplicates first
      logs = this.removeDuplicates(logs);

      // If logs are order desc, then reverse the list
      if (order === 'desc') {
        logs.reverse();
      }

      // add at beginning of array
      each(logs, log => {
        this.logs.push(log);
      });

      this.cleanLogs('APPEND');
    }

    // used for testing only
    // this.checkLogs();

    if (actions.includes('SCROLL_TO_VIEW')) {
      const firstLogElement = document.getElementById(this.scrollToViewLog);

      if (firstLogElement) {
        firstLogElement.scrollIntoView();
      }
    }

    if (actions.includes('SCROLL_TO_BOTTOM')) {
      // setTimeout seems to be required...
      setTimeout(() => window.scrollTo(0, document.body.scrollHeight));
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // scrollbar reached top completely
    if (window.scrollY === 0) {
      const firstLog: Log = this.logs[0];

      if (firstLog) {
        const timestamp = new Date(firstLog._source['@timestamp']).getTime();
        this.doSearch(this.searchRequest, 'lte', 'desc', ['PREPEND', 'SCROLL_TO_VIEW'], timestamp);
      }
    }

    // scrollbar reached bottom completely
    if (window.innerHeight + window.scrollY === document.documentElement.scrollHeight) {
      this.isLiveTail = true;
    }

    // scrollbar <= 100px from the bottom
    if (window.innerHeight + window.scrollY <= document.documentElement.scrollHeight) {
      // this.stopTailTimer(); // don't stop tailTimer when scrolling up for now
    }
  }

  removeDuplicates(logs: Log[]): Log[] {
    return filter(logs, (log) => !find(this.logs, { _id: log._id }));
  }

  // keep only MAX_LOGS last logs at all time
  // if we're scrolling up, remove last logs
  // if we're scrolling down, remove first logs
  cleanLogs(action: 'PREPEND' | 'APPEND'): void {
    const logsCount = this.logs.length;

    if (logsCount > this.MAX_LOGS) {
      if (action === 'PREPEND') {
        // if PREPEND, we're scrolling up, so clean logs from bottom (last logs)
        this.logs = this.logs.slice(0, this.MAX_LOGS);
      } else {
        // if APPEND, we're scrolling up, so clean logs from bottom (last logs)
        this.logs.splice(0, logsCount - this.MAX_LOGS);
      }
    }
  }

  getLatestLogs() {
    const lastLog = this.logs[this.logs.length - 1];
    let timestamp;

    if (lastLog) {
      timestamp = new Date(lastLog._source['@timestamp']).getTime();
    }

    this.doSearch(this.searchRequest, 'gte', 'desc', ['APPEND', 'SCROLL_TO_BOTTOM'], timestamp);
  }

  trackByLogId(index: number, log: Log): string {
    return log._id;
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    this.isLiveTail = false;
  }
}
