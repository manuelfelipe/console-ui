import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { ActivityComponent } from './activity.component';
import { EVENT_SOCKET_SERVICE_MOCK_PROVIDER } from '../../shared/event/event.socket.mock';
import { EventSocketService } from '../../shared/event/event.socket';
import { PUBSUB_EVENTS } from '../../shared/event/events.data';
import { EventService } from '../../shared/event/event.service';
import { EventRequestFactory } from '../../shared/event/event-request.factory';
import { EVENT_SERVICE_MOCK_PROVIDER } from '../../shared/event/event.service.mock';
import Spy = jasmine.Spy;

describe('ActivityComponent', () => {
  let component: ActivityComponent;
  let fixture: ComponentFixture<ActivityComponent>;

  let eventService: EventService;
  let eventSocketService: EventSocketService;

  let getEventsSpy: Spy;
  let eventSocketServiceSpy: Spy;
  let eventsUnshiftSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ActivityComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ActivityComponent],
        providers: [
          EVENT_SERVICE_MOCK_PROVIDER,
          EVENT_SOCKET_SERVICE_MOCK_PROVIDER,
          EventRequestFactory,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    eventService = TestBed.get(EventService);
    getEventsSpy = spyOn(eventService, 'getEvents').and.returnValue(Observable.of(PUBSUB_EVENTS));

    eventSocketService = TestBed.get(EventSocketService);
    eventSocketServiceSpy = spyOn(eventSocketService, 'watchActivities');

    fixture = TestBed.createComponent(ActivityComponent);
    component = fixture.componentInstance;

    // allows us to test if real-time events are passing the filters or not
    eventsUnshiftSpy = spyOn(component.events, 'unshift');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should subscribe to PubSub events', () => {
      eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));
      component.ngOnChanges();

      expect(component.events).toEqual([PUBSUB_EVENTS[3], PUBSUB_EVENTS[2], PUBSUB_EVENTS[1], PUBSUB_EVENTS[0]]);
      expect(eventSocketServiceSpy).toHaveBeenCalledWith(null);
    });

    it('should subscribe to PubSub events', () => {
      eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

      component.namespace = 'console-server';
      component.ngOnChanges();

      expect(component.events).toEqual([PUBSUB_EVENTS[3], PUBSUB_EVENTS[2], PUBSUB_EVENTS[1], PUBSUB_EVENTS[0]]);
      expect(eventSocketServiceSpy).toHaveBeenCalledWith('console-server');
    });
  });

  describe('onSearch', () => {
    describe('filter by namespace', () => {
      it('should keep `console-server` namespace events only, as console-server event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          namespace: 'Console-Server',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[0]);
      });

      it('should keep `console-server` namespace events only, as console-develop event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[3]));

        component['watchActivities']({
          namespace: 'console-server',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });
    });

    describe('filter by user', () => {
      it('should keep `Mark Massoud` user events only, as Mark event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          user: 'Mark M',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[0]);
      });

      it('should keep `Mark Massoud` user events only, as Manuel event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[1]));

        component['watchActivities']({
          user: 'Mark M',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });

      it('should keep `Mark Massoud` user events only, as Yamen event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[2]));

        component['watchActivities']({
          user: 'Mark M',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });

      it('should keep `Mark Massoud` user events only, as other Mark event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[3]));

        component['watchActivities']({
          user: 'Mark M',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[3]);
      });

      it('should keep `mmassou1` user events only, as Mark event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          user: 'mmassou1',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[0]);
      });

      it('should keep `Mark.Massoud@` user events only, as Mark event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          user: 'Mark.Massoud@',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[0]);
      });
    });

    describe('filter by since', () => {
      it('should keep `since 2017-4-13` timestamp events only, as 2017-4-12 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          since: '2017-4-13',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });

      it('should keep `since 2017-4-13` timestamp events only, as 2017-4-13 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[1]));

        component['watchActivities']({
          since: '2017-4-13',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[1]);
      });

      it('should keep `since 2017-4-13` timestamp events only, as 2017-4-14 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[2]));

        component['watchActivities']({
          since: '2017-4-13',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[2]);
      });

      it('should keep `since 2017-4-13` timestamp events only, as 2017-4-15 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[3]));

        component['watchActivities']({
          since: '2017-4-13',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[3]);
      });
    });

    describe('filter by to', () => {
      it('should keep `to 2017-4-14` timestamp events only, as 2017-4-12 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[0]);
      });

      it('should keep `to 2017-4-14` timestamp events only, as 2017-4-13 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[1]));

        component['watchActivities']({
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[1]);
      });

      it('should keep `to 2017-4-14` timestamp events only, as 2017-4-14 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[2]));

        component['watchActivities']({
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[2]);
      });

      it('should keep `to 2017-4-14` timestamp events only, as 2017-4-15 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[3]));

        component['watchActivities']({
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });
    });

    describe('filter by since and to', () => {
      it('should keep `since 2017-4-13 to 2017-4-14` timestamp events only, as 2017-4-12 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[0]));

        component['watchActivities']({
          since: '2017-4-13',
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });

      it('should keep `since 2017-4-13 to 2017-4-14` timestamp events only, as 2017-4-13 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[1]));

        component['watchActivities']({
          since: '2017-4-13',
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[1]);
      });

      it('should keep `since 2017-4-13 to 2017-4-14` timestamp events only, as 2017-4-14 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[2]));

        component['watchActivities']({
          since: '2017-4-13',
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).toHaveBeenCalledWith(PUBSUB_EVENTS[2]);
      });

      it('should keep `since 2017-4-13 to 2017-4-14` timestamp events only, as 2017-4-15 event', () => {
        eventSocketServiceSpy.and.returnValue(Observable.of(PUBSUB_EVENTS[3]));

        component['watchActivities']({
          since: '2017-4-13',
          to: '2017-4-14',
        });

        expect(eventsUnshiftSpy).not.toHaveBeenCalled();
      });
    });
  });
});
