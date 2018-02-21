import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { AlertsComponent } from './alerts.component';
import { AlertService } from '../../shared/alert/alert.service';
import { ALERT_SERVICE_MOCK_PROVIDER } from '../../shared/alert/alert.service.mock';

describe('AlertsComponent', () => {
  let component: AlertsComponent;
  let fixture: ComponentFixture<AlertsComponent>;

  let alertService: AlertService;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(AlertsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [AlertsComponent],
        providers: [
          ALERT_SERVICE_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    alertService = TestBed.get(AlertService);
    spyOn(alertService, 'getAlerts').and.returnValue(Observable.of([{ message: 'Alerting' }]));

    fixture = TestBed.createComponent(AlertsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get alerts', () => {
      expect(component.alerts).toEqual([{ message: 'Alerting' }]);
    });
  });

  describe('getType', () => {
    it('should return `info` if not whitelisted', () => {
      expect(component.getType('unknown')).toBe('info');
    });

    it('should return type if whitelisted', () => {
      expect(component.getType('success')).toBe('success');
    });
  });
});
