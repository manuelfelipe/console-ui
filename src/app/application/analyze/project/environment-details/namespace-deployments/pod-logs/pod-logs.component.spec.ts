import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { PodLogsComponent } from './pod-logs.component';
import { ACTIVATED_ROUTE_MOCK_PROVIDER } from '../../../../../../../testing/mocks/activated-route.mock';
import { KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kubernetes/kubernetes.socket.mock';
import { KubernetesSocketService } from '../../../../../../shared/kubernetes/kubernetes.socket';
import { KubernetesService } from '../../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../../shared/kubernetes/kubernetes-request.factory';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/kubernetes/kubernetes.service.mock';
import { KUBERNETES_POD_LOGS } from '../../../../../../shared/kubernetes/pod/pod-logs.data';
import { ToastrService } from '../../../../../../shared/toastr/toastr.service';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../../../../shared/toastr/toastr.service.mock';
import Spy = jasmine.Spy;

describe('PodLogsComponent', () => {
  let component: PodLogsComponent;
  let fixture: ComponentFixture<PodLogsComponent>;
  let route: ActivatedRoute;

  let kubernetesService: KubernetesService;
  let kubernetesSocketService: KubernetesSocketService;
  let toastrService: ToastrService;

  let getPodLogsSpy: Spy;
  let streamPodLogsSpy: Spy;
  let toastErrorSpy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(PodLogsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [PodLogsComponent],
        providers: [
          ACTIVATED_ROUTE_MOCK_PROVIDER,
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KUBERNETES_SOCKET_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          TOASTR_SERVICE_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesService = TestBed.get(KubernetesService);
    getPodLogsSpy = spyOn(kubernetesService, 'getPodLogs');

    kubernetesSocketService = TestBed.get(KubernetesSocketService);
    streamPodLogsSpy = spyOn(kubernetesSocketService, 'streamPodLogs').and.returnValue(Observable.of(KUBERNETES_POD_LOGS[0]));

    toastrService = TestBed.get(ToastrService);
    toastErrorSpy = spyOn(toastrService, 'error');

    route = TestBed.get(ActivatedRoute);
    route.params = Observable.of({
      cluster: 'CLUSTER',
      namespace: 'NAMESPACE',
      pod: 'POD',
    });

    route.queryParams = Observable.of({
      container: 'CONTAINER',
    });

    fixture = TestBed.createComponent(PodLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should grab params correctly', () => {
    expect(streamPodLogsSpy).toHaveBeenCalledWith('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER');
  });

  it('should initiate variables as per default', () => {
    expect(component.isLiveTail).toBe(true);
    expect(component.MAX_LOGS).toBe(5000);
    expect(component['isPrevious']).toBeUndefined();
  });

  it('should toggle isLiveTrail', () => {
    expect(component.isLiveTail).toBe(true);

    component.toggleLiveTail();
    expect(component.isLiveTail).toBe(false);

    component.toggleLiveTail();
    expect(component.isLiveTail).toBe(true);
  });

  describe('scrollToBottom', () => {
    it('should clean logs properly when MAX_LOGS=10', (done) => {
      const scrollToSpy = spyOn(window, 'scrollTo');
      component.scrollToBottom();

      setTimeout(() => {
        expect(scrollToSpy).toHaveBeenCalledWith(0, document.body.scrollHeight);
        done();
      }, 10);
    });
  });

  describe('cleanLogs', () => {
    it('should clean logs properly when MAX_LOGS=10', () => {
      component.MAX_LOGS = 10;
      component.logs = [...KUBERNETES_POD_LOGS];

      expect(component.logs.length).toBe(KUBERNETES_POD_LOGS.length);
      expect(component.logs[0]).toBe('LOG_#1');
      expect(component.logs[component.logs.length - 1]).toBe('2017-09-28T16:23:17.491052676Z LOG_#1000');

      component.cleanLogs();

      expect(component.logs.length).toBe(component.MAX_LOGS);
      expect(component.logs[0]).toBe('LOG_#991');
      expect(component.logs[component.logs.length - 1]).toBe('2017-09-28T16:23:17.491052676Z LOG_#1000');
    });

    it('should clean logs properly when MAX_LOGS=500', () => {
      component.MAX_LOGS = 500;
      component.logs = [...KUBERNETES_POD_LOGS];

      expect(component.logs.length).toBe(KUBERNETES_POD_LOGS.length);
      expect(component.logs[0]).toBe('LOG_#1');
      expect(component.logs[component.logs.length - 1]).toBe('2017-09-28T16:23:17.491052676Z LOG_#1000');

      component.cleanLogs();

      expect(component.logs.length).toBe(component.MAX_LOGS);
      expect(component.logs[0]).toBe('LOG_#501');
      expect(component.logs[component.logs.length - 1]).toBe('2017-09-28T16:23:17.491052676Z LOG_#1000');
    });
  });

  describe('setInterval(cleanLogs)', () => {
    it('should not call cleanLogs if 2000ms have not passed', (done) => {
      const cleanLogsSpy = spyOn(component, 'cleanLogs');
      fixture.detectChanges();

      expect(cleanLogsSpy).not.toHaveBeenCalled();
      done();
    });

    it('should call cleanLogs if 2000ms have passed', (done) => {
      const cleanLogsSpy = spyOn(component, 'cleanLogs');
      fixture.detectChanges();

      setTimeout(() => {
        expect(cleanLogsSpy).toHaveBeenCalled();
        done();
      }, 2000);
    });
  });

  describe('ngOnInit.getPodLogs', () => {
    it('should call toastr.error if getPodLogs fails', () => {
      // reset values, because they get called from `beforeEach`
      component.logs = [];
      getPodLogsSpy.calls.reset();
      streamPodLogsSpy.calls.reset();

      getPodLogsSpy.and.throwError('error');

      route.queryParams = Observable.of({
        container: 'CONTAINER',
        previous: true,
      });

      component.ngOnInit();

      expect(component.isLiveTail).toBe(false);
      expect(component['isPrevious']).toBe(true);

      expect(component.logs.length).toBe(0);

      expect(streamPodLogsSpy).not.toHaveBeenCalled();
      expect(getPodLogsSpy).toHaveBeenCalledWith({
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          pod: 'POD',
        },
        queryParams: {
          container: 'CONTAINER',
          previous: true
        },
      });
      expect(toastErrorSpy).toHaveBeenCalled();
    });

    it('should getPodLogs instead of streamPodLogs', () => {
      const scrollToBottomSpy = spyOn(component, 'scrollToBottom');

      // reset values, because they get called from `beforeEach`
      component.logs = [];
      component.isLiveTail = true;
      getPodLogsSpy.calls.reset();
      streamPodLogsSpy.calls.reset();

      component.MAX_LOGS = 1000;
      getPodLogsSpy.and.returnValue(Observable.of(KUBERNETES_POD_LOGS));

      route.queryParams = Observable.of({
        container: 'CONTAINER',
        previous: true,
      });

      component.ngOnInit();

      expect(component.isLiveTail).toBe(false);
      expect(component['isPrevious']).toBe(true);

      expect(component.logs.length).toBe(1000);

      // timestamp is converted to local time, so we can't guess the exact time, as it depends on the machine tests are running on
      expect(component.logs[component.logs.length - 1]).toMatch(/<span class="text-info">2017\/09\/28 (\d{2}):23<\/span> LOG_#1000/);

      expect(streamPodLogsSpy).not.toHaveBeenCalled();
      expect(getPodLogsSpy).toHaveBeenCalledWith({
        params: {
          cluster: 'CLUSTER',
          namespace: 'NAMESPACE',
          pod: 'POD',
        },
        queryParams: {
          container: 'CONTAINER',
          previous: true
        },
      });
      expect(toastErrorSpy).not.toHaveBeenCalled();

      // with isPrevious = false, scrolling is disabled
      expect(scrollToBottomSpy).not.toHaveBeenCalled();
    });
  });

  describe('ngOnDestroy', () => {
    it('should not unsubscribe if sub is null', () => {
      const unsubscribeSpy = spyOn(component.sub, 'unsubscribe');

      component.sub = null;
      component.ngOnDestroy();

      expect(unsubscribeSpy).not.toHaveBeenCalled();
    });

    it('should unsubscribe', () => {
      const unsubscribeSpy = spyOn(component.sub, 'unsubscribe');
      component.ngOnDestroy();

      expect(unsubscribeSpy).toHaveBeenCalled();
    });
  });
});
