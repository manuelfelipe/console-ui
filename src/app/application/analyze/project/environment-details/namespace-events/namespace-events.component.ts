import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { filter, find, findIndex, orderBy, uniqBy } from 'lodash';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { Event, EventType } from '../../../../../shared/kubernetes/event/event';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';

// dirty hack to change relative time ago
declare const require: any;
const moment = require('moment');

@Component({
  selector: 'app-namespace-events',
  templateUrl: './namespace-events.component.html',
  styleUrls: ['./namespace-events.component.scss']
})
export class NamespaceEventsComponent implements OnInit, OnDestroy {

  events: Event[] = [];

  eventFilters: { type: EventType, reason: string } = {
    type: null,
    reason: null,
  };

  types: EventType[] = [];
  reasons: string[] = [];

  sub: Subscription;
  watchSub: Subscription;

  // used in html
  EventType = EventType;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesSocketService: KubernetesSocketService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    moment.updateLocale('en', {
      relativeTime: {
        s: 'a few secs',
        ss: '%d secs',
        m: 'a min',
        mm: '%d mins',
      }
    });

    this.sub = this.route.params
      .map(params => ([params['cluster'], params['namespace']]))
      .do(([cluster, namespace]) => this.watchNamespaceEvents(cluster, namespace))
      .map(([cluster, namespace]) => this.kubernetesRequestFactory.toGetNamespaceEventsRequest(cluster, namespace))
      .mergeMap(request => this.kubernetesService.getNamespaceEvents(request))
      .map(response => this.kubernetesResponseFactory.toEvents(response))
      .do(events => this.setFilters(events))
      .subscribe(events => this.events = orderBy(events, ['lastTimestamp'], ['desc']));
  }

  watchNamespaceEvents(cluster: string, namespace: string): void {
    this.watchSub = this.kubernetesSocketService.watchNamespaceEvents(cluster, namespace)
      .map(watchEvent => ({
        type: watchEvent.type,
        data: this.kubernetesResponseFactory.toEvent(watchEvent.data)
      }))
      .subscribe(event => {
        this.handleWatchEvent(event);
        this.setFilters(this.events);
      });
  }

  setFilters(events: Event[]): void {
    this.types = uniqBy(events, 'type')
      .map((event: Event) => event.type)
      .sort((a, b) => a > b ? 1 : -1);

    this.reasons = uniqBy(events, 'reason')
      .map((event: Event) => event.reason)
      .sort((a, b) => a > b ? 1 : -1);
  }

  handleWatchEvent(watchEvent: WatchEvent<Event>): void {
    const watchEventType: WatchEventType = watchEvent ? watchEvent.type : -1;
    const event: Event = watchEvent ? watchEvent.data : null;

    switch (watchEventType) {
      case WatchEventType.ADDED:
        this.handleEventAdded(event);
        break;
      case WatchEventType.MODIFIED:
        this.handleEventModified(event);
        break;
      case WatchEventType.DELETED:
        this.handleEventDeleted(event);
        break;
      default:
        console.log('Unrecognized WatchEventType:', WatchEventType[watchEventType]);
    }

    // reorder events, newest first
    this.events = orderBy(this.events, ['lastTimestamp'], ['desc']);
  }

  handleEventAdded(event: Event): void {
    const existingEvent = find(this.events, { uid: event.uid });

    if (!existingEvent) {
      this.events.push(event);
    }
  }

  handleEventModified(event: Event): void {
    const oldEventIndex = findIndex(this.events, { uid: event.uid });

    if (oldEventIndex > -1) {
      this.events[oldEventIndex] = event;
    }
  }

  handleEventDeleted(event: Event): void {
    this.events = filter(this.events, (e) => (e.uid !== event.uid));
  }

  getEventTypeClass(event: Event): string {
    if (event && event.type === EventType.Normal) {
      return 'default';
    } else {
      return 'warning';
    }
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }

    if (this.watchSub) {
      this.watchSub.unsubscribe();
    }
  }
}
