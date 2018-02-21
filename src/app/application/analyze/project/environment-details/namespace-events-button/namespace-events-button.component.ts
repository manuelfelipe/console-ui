import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { Event, EventType } from '../../../../../shared/kubernetes/event/event';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';

@Component({
  selector: 'app-namespace-events-button',
  templateUrl: './namespace-events-button.component.html',
  styleUrls: ['./namespace-events-button.component.scss']
})
export class NamespaceEventsButtonComponent implements OnChanges, OnDestroy {

  @Input() cluster: string;
  @Input() namespace: string;

  warnings = new Set();

  sub: Subscription;
  watchSub: Subscription;

  constructor(private kubernetesService: KubernetesService,
              private kubernetesSocketService: KubernetesSocketService,
              private kubernetesRequestFactory: KubernetesRequestFactory,
              private kubernetesResponseFactory: KubernetesResponseFactory) {
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    if (!this.cluster || !this.namespace) {
      return;
    }

    const request = this.kubernetesRequestFactory.toGetNamespaceEventsRequest(this.cluster, this.namespace, EventType.Warning);

    this.sub = this.kubernetesService.getNamespaceEvents(request)
      .map(response => this.kubernetesResponseFactory.toEvents(response))
      .do(() => this.watchWarningEvents(this.cluster, this.namespace))
      .subscribe(events => {
        events.forEach((event) => {
          this.warnings.add(event.uid);
        });
      });
  }

  watchWarningEvents(cluster: string, namespace: string): void {
    this.watchSub = this.kubernetesSocketService.watchNamespaceEvents(cluster, namespace)
      .map(watchEvent => ({
        type: watchEvent.type,
        data: this.kubernetesResponseFactory.toEvent(watchEvent.data)
      }))
      .filter(watchEvent => watchEvent.data.type === EventType.Warning)
      .subscribe(watchEvent => {
        this.handleWatchEvent(watchEvent);
      });
  }

  handleWatchEvent(watchEvent: WatchEvent<Event>): void {
    const watchEventType: WatchEventType = watchEvent ? watchEvent.type : -1;
    const event: Event = watchEvent ? watchEvent.data : null;

    switch (watchEventType) {
      case WatchEventType.ADDED:
      case WatchEventType.MODIFIED:
        this.handleEventAdded(event);
        break;
      case WatchEventType.DELETED:
        this.handleEventDeleted(event);
        break;
      default:
        console.log('Unrecognized WatchEventType:', watchEventType[watchEventType]);
    }
  }

  handleEventAdded(event: Event): void {
    this.warnings.add(event.uid);
  }

  handleEventDeleted(event: Event): void {
    this.warnings.delete(event.uid);
  }

  openNamespaceEventsWindow(): void {
    const eventsUrl = `${this.cluster}/${this.namespace}/events`;
    window.open(eventsUrl, `Events - ${this.cluster}/${this.namespace}`, `height=500, width=${window.outerWidth}`);
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
