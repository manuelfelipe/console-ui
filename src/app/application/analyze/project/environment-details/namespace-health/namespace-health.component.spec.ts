import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { NamespaceHealthComponent } from './namespace-health.component';
import { KubernetesService } from '../../../../../shared/kubernetes/kubernetes.service';
import { KubernetesRequestFactory } from '../../../../../shared/kubernetes/kubernetes-request.factory';
import { KUBERNETES_SERVICE_MOCK_PROVIDER } from '../../../../../shared/kubernetes/kubernetes.service.mock';
import { ServiceHealth } from './service-health';
import { BaseRequest } from '../../../../../shared/base-service/base-request';
import { SimpleChange } from '@angular/core';
import Spy = jasmine.Spy;
import { UPTIME_SERVICE_MOCK_PROVIDER } from '../../../../../shared/uptime/uptime.service.mock';
import { UptimeRequestFactory } from '../../../../../shared/uptime/uptime-request.factory';
import { UptimeService } from '../../../../../shared/uptime/uptime.service';

describe('ServiceHealthComponent', () => {
  let kubernetesService: KubernetesService;
  let kubernetesRequestFactory: KubernetesRequestFactory;

  let uptimeService: UptimeService;
  let uptimeRequestFactory: UptimeRequestFactory;

  let urlSpy: Spy;
  let upstreamUrlSpy: Spy;
  let healthSpy: Spy;

  let component: NamespaceHealthComponent;
  let fixture: ComponentFixture<NamespaceHealthComponent>;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceHealthComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceHealthComponent],
        providers: [
          KUBERNETES_SERVICE_MOCK_PROVIDER,
          KubernetesRequestFactory,
          UPTIME_SERVICE_MOCK_PROVIDER,
          UptimeRequestFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kubernetesService = TestBed.get(KubernetesService);
    kubernetesRequestFactory = TestBed.get(KubernetesRequestFactory);

    uptimeService = TestBed.get(UptimeService);
    uptimeRequestFactory = TestBed.get(UptimeRequestFactory);

    urlSpy = spyOn(kubernetesService, 'getServiceURL').and.returnValue(Observable.of(String('https://service.io')));
    upstreamUrlSpy = spyOn(kubernetesService, 'getServiceUpstreamURL').and.returnValue(Observable.of(String('https://service.io')));
    spyOn(uptimeService, 'getSLA').and.returnValue(Observable.of(Number(12)));

    fixture = TestBed.createComponent(NamespaceHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    const changes = {
      namespace: new SimpleChange('console-server', 'console-server', true)
    };

    it('should do nothing if namespace not changed', () => {
      healthSpy = spyOn(kubernetesService, 'getServiceHealth').and.returnValue(Observable.of(Boolean(true)));

      component.namespace = 'console-server';
      component.ngOnChanges({});

      expect(component.serviceSLA).toBe(-1);
      expect(urlSpy).not.toHaveBeenCalled();
      expect(upstreamUrlSpy).not.toHaveBeenCalled();
      expect(healthSpy).not.toHaveBeenCalled();
    });

    it('should do nothing if namespace is null', () => {
      healthSpy = spyOn(kubernetesService, 'getServiceHealth').and.returnValue(Observable.of(Boolean(true)));

      component.namespace = null;
      component.ngOnChanges(changes);

      expect(component.serviceUrl).toBeUndefined();
      expect(component.serviceHealth).toBeUndefined();
      expect(component.serviceSLA).toBe(-1);

      expect(urlSpy).not.toHaveBeenCalled();
      expect(upstreamUrlSpy).not.toHaveBeenCalled();
      expect(healthSpy).not.toHaveBeenCalled();
    });

    it('should assign url and set health to true', () => {
      healthSpy = spyOn(kubernetesService, 'getServiceHealth').and.returnValue(Observable.of(Boolean(true)));

      component.namespace = 'console-server';
      component.ngOnChanges(changes);

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          namespace: 'console-server',
        }
      };

      expect(component.serviceUrl).toBe('https://service.io');
      expect(component.serviceHealth).toBe(ServiceHealth.OK);
      expect(component.serviceSLA).toBe(12);

      expect(urlSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(upstreamUrlSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(healthSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
    });

    it('should assign url but set health to false', () => {
      healthSpy = spyOn(kubernetesService, 'getServiceHealth').and.returnValue(Observable.of(Boolean(false)));

      component.namespace = 'console-server';
      component.ngOnChanges(changes);

      const EXPECTED_REQUEST: BaseRequest = {
        params: {
          namespace: 'console-server',
        }
      };

      expect(component.serviceUrl).toBe('https://service.io');
      expect(component.serviceHealth).toBe(ServiceHealth.NOK);
      expect(component.serviceSLA).toBe(12);

      expect(urlSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(upstreamUrlSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
      expect(healthSpy).toHaveBeenCalledWith(EXPECTED_REQUEST);
    });
  });

  describe('getStatusClass', () => {
    it('should return `success` if OK', () => {
      component.serviceHealth = ServiceHealth.OK;
      const statusClass = component.getStatusClass();

      expect(statusClass).toBe('success');
    });

    it('should return `danger` if NOK', () => {
      component.serviceHealth = ServiceHealth.NOK;
      const statusClass = component.getStatusClass();

      expect(statusClass).toBe('danger');
    });

    it('should return `warning` otherwise', () => {
      component.serviceHealth = null;
      const statusClass = component.getStatusClass();

      expect(statusClass).toBe('warning');
    });
  });
});
