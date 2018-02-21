import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { orderBy } from 'lodash';
import { Event } from '../../shared/event/event';
import { EventSocketService } from '../../shared/event/event.socket';
import { EventService } from '../../shared/event/event.service';
import { EventRequestFactory } from '../../shared/event/event-request.factory';
import { ActivitySearch } from './activity-search/activity-search';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnChanges, OnDestroy {

  // optional, searches to all if not specified
  @Input() namespace: string = null;
  isLoading = false;

  events: Event[] = [];
  sub: Subscription;

  constructor(private eventService: EventService,
              private eventRequestFactory: EventRequestFactory,
              private eventSocketService: EventSocketService) {
  }

  ngOnChanges() {
    this.onSearch({ namespace: this.namespace });
  }

  onSearch(search: ActivitySearch): void {
    // reset
    this.unsubscribe();
    this.events = [];

    // get existing events
    const request = this.eventRequestFactory.toGetEventsRequest(search.namespace, search.user, search.since, search.to);

    this.isLoading = true;
    this.eventService.getEvents(request).first()
      .do(() => this.watchActivities(search))
      .finally(() => this.isLoading = false)
      .subscribe(events => this.events = orderBy(events, ['timestamp'], ['desc']));
  }

  private watchActivities(search: ActivitySearch): void {
    this.sub = this.eventSocketService.watchActivities(this.namespace)
    // filter incoming events to match search criteria
      .filter(event => search.namespace ? event.namespace.toLowerCase() === search.namespace.toLowerCase() : true)
      .filter(event => search.user ?
        event.who.name.toLowerCase().includes(search.user.toLowerCase()) ||
        event.who.username.toLowerCase().includes(search.user.toLowerCase()) ||
        event.who.email.toLowerCase().includes(search.user.toLowerCase()) : true)
      .filter(event => !!event.timestamp)
      .filter(event => search.since ? new Date(event.timestamp) >= new Date(search.since) : true)
      // compare with < than the next day
      .filter(event => search.to ? new Date(event.timestamp) < new Date(new Date(search.to).getTime() + 86400000) : true)
      .subscribe(event => {
        this.events.unshift(event);
      });
  }

  private unsubscribe() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnDestroy() {
    this.unsubscribe();
  }
}
