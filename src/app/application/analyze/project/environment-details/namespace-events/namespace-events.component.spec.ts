import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { NamespaceEventsComponent } from './namespace-events.component';
import { KUBERNETES_EVENTS } from '../../../../../shared/kubernetes/event/events.data';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.service.mock';
import { KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.socket.mock';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../../testing/mocks/activated-route.mock';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { Event, EventType } from '../../../../../shared/kubernetes/event/event';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';
import Spy = jasmine.Spy;

describe('NamespaceEventsComponent', () => {
  let kubernetesService: KubernetesService;
  let kubernetesSocketService: KubernetesSocketService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesResponseFactory: KubernetesResponseFactory;
  let route: ActivatedRoute;

  let getNamespaceEventsSpy: Spy;
  let watchNamespaceEventsSpy: Spy;

  let component: NamespaceEventsComponent;
  let fixture: ComponentFixture<NamespaceEventsComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceEventsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceEventsComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER,
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          KubernetesResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);

    kubernetesService = TestBed.get(KubernetesService);
    getNamespaceEventsSpy = spyOn(kubernetesService, 'getNamespaceEvents').and.returnValue(Observable.of(KUBERNETES_EVENTS));

    kubernetesSocketService = TestBed.get(KubernetesSocketService);
    watchNamespaceEventsSpy = spyOn(kubernetesSocketService, 'watchNamespaceEvents').and.returnValue(Observable.of({
      type: WatchEventType.ADDED,
      data: KUBERNETES_EVENTS[0],
    }));

    route = TestBed.get(ActivatedRoute);
    route.params = Observable.of({
      cluster: 'aws',
      namespace: 'console-server',
    });

    fixture = TestBed.createComponent(NamespaceEventsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call getNamespaceEventsSpy with correct params', () => {
    const EXPECTED: Event[] = kubernetesResponseFactory.toEvents(KUBERNETES_EVENTS);

    expect(component.events).toEqual(EXPECTED);
    expect(getNamespaceEventsSpy).toHaveBeenCalledWith({
      params: {
        cluster: 'aws',
        namespace: 'console-server',
      }
    });
  });

  describe('handleEvent', () => {
    let handleEventAddedSpy: Spy;
    let handleEventModifiedSpy: Spy;
    let handleEventDeletedSpy: Spy;

    beforeEach(() => {
      handleEventAddedSpy = spyOn(component, 'handleEventAdded').and.callThrough();
      handleEventModifiedSpy = spyOn(component, 'handleEventModified').and.callThrough();
      handleEventDeletedSpy = spyOn(component, 'handleEventDeleted').and.callThrough();
    });

    it('should not call anything', () => {
      component.handleWatchEvent(null);

      expect(handleEventAddedSpy).not.toHaveBeenCalled();
      expect(handleEventModifiedSpy).not.toHaveBeenCalled();
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should order events by event.lastTimestamp, desc', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.events = [event];

      const eventToAdd: Event = cloneDeep(event);
      eventToAdd.uid = 'new uid';
      eventToAdd.lastTimestamp.setDate(eventToAdd.lastTimestamp.getDate() + 1); // 1 day later, should come first

      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.ADDED,
        data: eventToAdd,
      };

      // should be added
      expect(component.events.length).toBe(1);
      component.handleWatchEvent(watchEvent);
      expect(component.events.length).toBe(2);

      // should have called handleEventAdded() only
      expect(handleEventAddedSpy).toHaveBeenCalledWith(eventToAdd);
      expect(handleEventModifiedSpy).not.toHaveBeenCalled();
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();

      // should have podToAdd first in array
      expect(component.events[0]).toEqual(eventToAdd);
      expect(component.events[1]).toEqual(event);
    });

    it('should call handleEventAddedSpy', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.ADDED,
        data: event,
      };

      component.handleWatchEvent(watchEvent);

      expect(handleEventAddedSpy).toHaveBeenCalledWith(event);
      expect(handleEventModifiedSpy).not.toHaveBeenCalled();
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handleEventModifiedSpy', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.MODIFIED,
        data: event,
      };

      component.handleWatchEvent(watchEvent);

      expect(handleEventAddedSpy).not.toHaveBeenCalled();
      expect(handleEventModifiedSpy).toHaveBeenCalledWith(event);
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handleEventDeletedSpy', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.DELETED,
        data: event,
      };

      component.handleWatchEvent(watchEvent);

      expect(handleEventAddedSpy).not.toHaveBeenCalled();
      expect(handleEventModifiedSpy).not.toHaveBeenCalled();
      expect(handleEventDeletedSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleEventAdded', () => {
    it('should not add event if already exists', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.events = [event];

      expect(component.events.length).toBe(1);
      component.handleEventAdded(event);
      expect(component.events.length).toBe(1);
    });

    it('should add event if does not exists', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.events = [];

      expect(component.events.length).toBe(0);
      component.handleEventAdded(event);
      expect(component.events.length).toBe(1);
    });
  });

  describe('handleEventModified', () => {
    it('should not replace event if does not exists', () => {
      const events: Event[] = kubernetesResponseFactory.toEvents(KUBERNETES_EVENTS);
      component.events = events;

      const modifiedEvent: Event = cloneDeep(events[0]);
      modifiedEvent.uid = 'unknown uid';

      expect(component.events.length).toBe(2);
      component.handleEventModified(modifiedEvent);
      expect(component.events.length).toBe(2);
      expect(component.events).toEqual(events);
    });

    it('should replace event if exists', () => {
      const events: Event[] = kubernetesResponseFactory.toEvents(KUBERNETES_EVENTS);
      component.events = events;

      const modifiedEvent: Event = cloneDeep(events[0]);
      modifiedEvent.type = EventType.Normal;

      expect(component.events.length).toBe(2);
      component.handleEventModified(modifiedEvent);
      expect(component.events.length).toBe(2);
      expect(component.events[0].type).toBe(EventType.Normal);
      expect(component.events[1]).toEqual(events[1]);
    });
  });

  describe('handleEventDeleted', () => {
    it('should not delete event if not found', () => {
      const events: Event[] = kubernetesResponseFactory.toEvents(KUBERNETES_EVENTS);
      component.events = events;

      const modifiedEvent: Event = cloneDeep(events[0]);
      modifiedEvent.uid = 'unknown uid';

      expect(component.events.length).toBe(2);
      component.handleEventDeleted(modifiedEvent);
      expect(component.events.length).toBe(2);
      expect(component.events).toEqual(events);
    });

    it('should delete event if found', () => {
      const events: Event[] = kubernetesResponseFactory.toEvents(KUBERNETES_EVENTS);
      component.events = events;

      const modifiedEvent: Event = cloneDeep(events[0]);

      expect(component.events.length).toBe(2);
      component.handleEventDeleted(modifiedEvent);
      expect(component.events.length).toBe(1);
      expect(component.events).not.toContain(modifiedEvent);
    });
  });

  describe('getEventTypeClass', () => {
    it('should return `default` if passed a Normal event', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[1]);
      const eventTypeClass = component.getEventTypeClass(event);

      expect(eventTypeClass).toBe('default');
    });

    it('should return `warning` if passed a null event', () => {
      const eventTypeClass = component.getEventTypeClass(null);

      expect(eventTypeClass).toBe('warning');
    });

    it('should return `warning` if passed a Warning event', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const eventTypeClass = component.getEventTypeClass(event);

      expect(eventTypeClass).toBe('warning');
    });
  });
});
