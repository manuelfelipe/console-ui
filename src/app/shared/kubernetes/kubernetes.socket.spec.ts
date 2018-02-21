import { ConnectionBackend, Http, HttpModule } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { WrappedSocket } from 'ng-socket-io/socket-io.service';
import { KubernetesSocketService } from './kubernetes.socket';
import {
  WATCH_EVENT_ADDED_RESPONSE,
  WATCH_EVENT_DELETED_RESPONSE,
  WATCH_EVENT_MODIFIED_RESPONSE
} from './watch-event/watch-events.data';
import { EVENTS } from '../base-service/event-request';
import { SOCKET_MOCK_PROVIDER } from 'testing/mocks/socket.mock';
import Spy = jasmine.Spy;

describe('KubernetesSocketService tests', () => {
  let service: KubernetesSocketService;
  let socket: WrappedSocket;
  let backend: MockBackend;
  let http: Http;

  let socketEmitSpy: Spy;
  let socketFromEventSpy: Spy;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      declarations: [],
      providers: [
        SOCKET_MOCK_PROVIDER,
        KubernetesSocketService,
        Http,
        {
          provide: ConnectionBackend,
          useClass: MockBackend,
        },
      ],
    });
  });

  beforeEach(() => {
    service = TestBed.get(KubernetesSocketService);

    socket = TestBed.get(WrappedSocket);
    socketEmitSpy = spyOn(service, 'emit');
    socketFromEventSpy = spyOn(service, 'fromEvent');

    backend = TestBed.get(ConnectionBackend);
    http = TestBed.get(Http);
  });

  it('should be instantiable', () => {
    expect(service).toBeDefined();
  });

  describe('watchDeploymentPods', () => {
    it('should fail when `cluster` param is missing', () => {
      service.watchDeploymentPods(null, 'NAMESPACE', 'DEPLOYMENT')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('cluster param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `namespace` param is missing', () => {
      service.watchDeploymentPods('CLUSTER', null, 'DEPLOYMENT')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('namespace param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `deployment` param is missing', () => {
      service.watchDeploymentPods('CLUSTER', 'NAMESPACE', null)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('deployment param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.watchDeploymentPods('CLUSTER', 'NAMESPACE', 'DEPLOYMENT')
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit cluster, namespace, deployment, and return pod event of type 0 (ADDED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_ADDED_RESPONSE));

      service.watchDeploymentPods('CLUSTER', 'NAMESPACE', 'DEPLOYMENT')
        .subscribe(event => {
          expect(event.type).toBe(0);
          expect(event.data).toBe(WATCH_EVENT_ADDED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_DEPLOYMENT_PODS_CLUSTER_NAMESPACE_DEPLOYMENT');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_NAMESPACE_DEPLOYMENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
            deployment: 'DEPLOYMENT',
          });
        }, error => fail(error));
    });

    it('should emit cluster, namespace, deployment, and return pod event of type 1 (MODIFIED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_MODIFIED_RESPONSE));

      service.watchDeploymentPods('CLUSTER', 'NAMESPACE', 'DEPLOYMENT')
        .subscribe(event => {
          expect(event.type).toBe(1);
          expect(event.data).toBe(WATCH_EVENT_ADDED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_DEPLOYMENT_PODS_CLUSTER_NAMESPACE_DEPLOYMENT');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_NAMESPACE_DEPLOYMENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
            deployment: 'DEPLOYMENT',
          });
        }, error => fail(error));
    });

    it('should emit cluster, namespace, deployment, and return pod event of type 2 (DELETED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_DELETED_RESPONSE));

      service.watchDeploymentPods('CLUSTER', 'NAMESPACE', 'DEPLOYMENT')
        .subscribe(event => {
          expect(event.type).toBe(2);
          expect(event.data).toBe(WATCH_EVENT_ADDED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_DEPLOYMENT_PODS_CLUSTER_NAMESPACE_DEPLOYMENT');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_NAMESPACE_DEPLOYMENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
            deployment: 'DEPLOYMENT',
          });
        }, error => fail(error));
    });
  });

  describe('watchNamespaceEvents', () => {
    it('should fail when `cluster` param is missing', () => {
      service.watchNamespaceEvents(null, 'NAMESPACE')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('cluster param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `namespace` param is missing', () => {
      service.watchNamespaceEvents('CLUSTER', null)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('namespace param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.watchNamespaceEvents('CLUSTER', 'NAMESPACE')
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit cluster, namespace, and return event of type 0 (ADDED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_ADDED_RESPONSE));

      service.watchNamespaceEvents('CLUSTER', 'NAMESPACE')
        .subscribe(event => {
          expect(event.type).toBe(0);
          expect(event.data).toBe(WATCH_EVENT_ADDED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_EVENTS_CLUSTER_NAMESPACE');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_EVENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
          });
        }, error => fail(error));
    });

    it('should emit cluster, namespace, and return pod event of type 1 (MODIFIED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_MODIFIED_RESPONSE));

      service.watchNamespaceEvents('CLUSTER', 'NAMESPACE')
        .subscribe(event => {
          expect(event.type).toBe(1);
          expect(event.data).toBe(WATCH_EVENT_ADDED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_EVENTS_CLUSTER_NAMESPACE');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_EVENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
          });
        }, error => fail(error));
    });

    it('should emit cluster, namespace, deployment, and return pod event of type 2 (DELETED)', () => {
      socketFromEventSpy.and.returnValue(Observable.of(WATCH_EVENT_DELETED_RESPONSE));

      service.watchNamespaceEvents('CLUSTER', 'NAMESPACE')
        .subscribe(event => {
          expect(event.type).toBe(2);
          expect(event.data).toBe(WATCH_EVENT_DELETED_RESPONSE.data);
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_EVENTS_CLUSTER_NAMESPACE');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_EVENTS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
          });
        }, error => fail(error));
    });
  });

  describe('streamPodLogs', () => {
    it('should fail when `cluster` param is missing', () => {
      service.streamPodLogs(null, 'NAMESPACE', 'POD', 'CONTAINER')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('cluster param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `namespace` param is missing', () => {
      service.streamPodLogs('CLUSTER', null, 'POD', 'CONTAINER')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('namespace param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `pod` param is missing', () => {
      service.streamPodLogs('CLUSTER', 'NAMESPACE', null, 'CONTAINER')
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('pod param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when `container` param is missing', () => {
      service.streamPodLogs('CLUSTER', 'NAMESPACE', 'POD', null)
        .subscribe(() => {
          fail();
        }, error => {
          expect(error).toBe('container param is required');
          expect(socketFromEventSpy).not.toHaveBeenCalled();
        });
    });

    it('should fail when calling service fails', () => {
      socketFromEventSpy.and.returnValue(Observable.throw('error with connection'));

      service.streamPodLogs('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER')
        .subscribe(() => {
          fail();
        }, error => expect(error).toBe('error with connection'));
    });

    it('should emit cluster, namespace, pod, and return string log', () => {
      socketFromEventSpy.and.returnValue(Observable.of('LOG_#1'));

      service.streamPodLogs('CLUSTER', 'NAMESPACE', 'POD', 'CONTAINER')
        .subscribe(log => {
          expect(log).toBe('LOG_#1');
          expect(socketFromEventSpy).toHaveBeenCalledWith('KUBERNETES_POD_LOGS_CLUSTER_NAMESPACE_POD_CONTAINER');
          expect(socketEmitSpy).toHaveBeenCalledWith(EVENTS.KUBERNETES_POD_LOGS_REQUEST, {
            cluster: 'CLUSTER',
            namespace: 'NAMESPACE',
            pod: 'POD',
            container: 'CONTAINER',
          });
        }, error => fail(error));
    });
  });
});
