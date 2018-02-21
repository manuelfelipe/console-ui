import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { cloneDeep } from 'lodash';
import { NamespaceEventsButtonComponent } from './namespace-events-button.component';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.service.mock';
import { KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.socket.mock';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesSocketService } from '../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KubernetesResponseFactory } from '../../../../../shared/kubernetes/kubernetes-response.factory';
import { Event } from '../../../../../shared/kubernetes/event/event';
import { WatchEvent, WatchEventType } from '../../../../../shared/kubernetes/watch-event/watch-event';
import { KUBERNETES_EVENTS } from '../../../../../shared/kubernetes/event/events.data';
import Spy = jasmine.Spy;

describe('NamespaceEventsButtonComponent', () => {
  let kubernetesService: KubernetesService;
  let kubernetesSocketService: KubernetesSocketService;
  let kubernetesRequestFactory: KubernetesRequestFactory;
  let kubernetesResponseFactory: KubernetesResponseFactory;

  let getNamespaceEventsSpy: Spy;
  let watchNamespaceEventsSpy: Spy;

  let component: NamespaceEventsButtonComponent;
  let fixture: ComponentFixture<NamespaceEventsButtonComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceEventsButtonComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceEventsButtonComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          KubernetesResponseFactory,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);
    kubernetesResponseFactory = TestBed.get(KubernetesResponseFactory);

    kubernetesService = TestBed.get(KubernetesService);
    getNamespaceEventsSpy = spyOn(kubernetesService, 'getNamespaceEvents').and.returnValue(Observable.of([KUBERNETES_EVENTS[0]]));

    kubernetesSocketService = TestBed.get(KubernetesSocketService);
    watchNamespaceEventsSpy = spyOn(kubernetesSocketService, 'watchNamespaceEvents').and.returnValue(Observable.of({
      type: WatchEventType.ADDED,
      data: KUBERNETES_EVENTS[0],
    }));

    fixture = TestBed.createComponent(NamespaceEventsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should not call getNamespaceEventsSpy if cluster is null', () => {
    component.cluster = null;
    component.namespace = 'console-server';

    component.ngOnChanges({});
    expect(getNamespaceEventsSpy).not.toHaveBeenCalled();
  });

  it('should not call getNamespaceEventsSpy if namespace is null', () => {
    component.cluster = 'aws';
    component.namespace = null;

    component.ngOnChanges({});
    expect(getNamespaceEventsSpy).not.toHaveBeenCalled();
  });

  it('should call getNamespaceEventsSpy with correct params', () => {
    component.cluster = 'aws';
    component.namespace = 'console-server';

    component.ngOnChanges({});
    expect(component.warnings.size).toBe(1);
    expect(getNamespaceEventsSpy).toHaveBeenCalledWith({
      params: {
        cluster: 'aws',
        namespace: 'console-server',
      },
      queryParams: {
        type: 'Warning',
      },
    });
  });

  it('should open new namespace events window', () => {
    component.cluster = 'aws';
    component.namespace = 'console-server';

    const openSpy = spyOn(window, 'open');

    component.openNamespaceEventsWindow();
    expect(openSpy).toHaveBeenCalledWith(
      `aws/console-server/events`,
      `Events - aws/console-server`,
      `height=500, width=${window.outerWidth}`);
  });

  describe('handleEvent', () => {
    let handleEventAddedSpy: Spy;
    let handleEventDeletedSpy: Spy;

    beforeEach(() => {
      handleEventAddedSpy = spyOn(component, 'handleEventAdded').and.callThrough();
      handleEventDeletedSpy = spyOn(component, 'handleEventDeleted').and.callThrough();
    });

    it('should not call anything', () => {
      component.handleWatchEvent(null);

      expect(handleEventAddedSpy).not.toHaveBeenCalled();
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handleEventAddedSpy', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.ADDED,
        data: event,
      };

      component.handleWatchEvent(watchEvent);

      expect(handleEventAddedSpy).toHaveBeenCalledWith(event);
      expect(handleEventDeletedSpy).not.toHaveBeenCalled();
    });

    it('should call handleEventAddedSpy when WatchEventType.MODIFIED', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      const watchEvent: WatchEvent<Event> = {
        type: WatchEventType.MODIFIED,
        data: event,
      };

      component.handleWatchEvent(watchEvent);

      expect(handleEventAddedSpy).toHaveBeenCalledWith(event);
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
      expect(handleEventDeletedSpy).toHaveBeenCalledWith(event);
    });
  });

  describe('handleEventAdded', () => {
    it('should not add event uid if already exists', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.warnings.clear();
      component.warnings.add(event.uid);

      expect(component.warnings.size).toBe(1);
      component.handleEventAdded(event);
      expect(component.warnings.size).toBe(1);
    });

    it('should add event if does not exists', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.warnings.clear();

      expect(component.warnings.size).toBe(0);
      component.handleEventAdded(event);
      expect(component.warnings.size).toBe(1);
    });
  });

  describe('handleEventDeleted', () => {
    it('should not delete event if not found', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.warnings.clear();
      component.warnings.add(event.uid);

      const modifiedEvent: Event = cloneDeep(event);
      modifiedEvent.uid = 'unknown uid';

      expect(component.warnings.size).toBe(1);
      component.handleEventDeleted(modifiedEvent);
      expect(component.warnings.size).toBe(1);
    });

    it('should delete event if found', () => {
      const event: Event = kubernetesResponseFactory.toEvent(KUBERNETES_EVENTS[0]);
      component.warnings.clear();
      component.warnings.add(event.uid);

      expect(component.warnings.size).toBe(1);
      component.handleEventDeleted(event);
      expect(component.warnings.size).toBe(0);
    });
  });
});
