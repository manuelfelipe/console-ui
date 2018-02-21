import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { CloudStatusComponent } from './cloud-status.component';
import { UPTIME_SERVICE_MOCK_PROVIDER } from '../../../../shared/uptime/uptime.service.mock';
import { UptimeService as UptimeServiceModel } from '../../../../shared/uptime/uptime-service';
import { UptimeService } from '../../../../shared/uptime/uptime.service';

describe('CloudStatusComponent', () => {
  let component: CloudStatusComponent;
  let fixture: ComponentFixture<CloudStatusComponent>;

  let uptime: UptimeService;

  const uptimes: UptimeServiceModel[] = [
    {
      description: 'Service Dev',
      status_public: 0,
    },
    {
      description: 'Service Prod',
      status_public: 1,
    },
    {
      description: 'Kubernetes AWS',
      kind: 'Kubernetes',
      status_public: 0,
    },
    {
      description: 'Kubernetes GCE',
      kind: 'Kubernetes',
      status_public: 1,
    },
  ] as UptimeServiceModel[];

  beforeEach(async(() => {
    TestBed
      .overrideComponent(CloudStatusComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [CloudStatusComponent],
        providers: [
          UPTIME_SERVICE_MOCK_PROVIDER
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    uptime = TestBed.get(UptimeService);
    spyOn(uptime, 'getInfras').and.returnValue(Observable.of(uptimes));

    fixture = TestBed.createComponent(CloudStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should order uptimes based on prod/non-prod', () => {
      const EXPECTED: UptimeServiceModel[] = [
        {
          description: 'Service Prod',
          status_public: 1,
        },
        {
          description: 'Kubernetes AWS',
          kind: 'Kubernetes',
          status_public: 0,
        },
        {
          description: 'Kubernetes GCE',
          kind: 'Kubernetes',
          status_public: 1,
        },
        {
          description: 'Service Dev',
          status_public: 0,
        },
      ] as UptimeServiceModel[];

      expect(component.infras).toEqual(EXPECTED);
    });

    it('should set uptimeSeverity', () => {
      expect(component.uptimeSeverity).toBe('danger');
    });
  });
});
