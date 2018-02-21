import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { StatusComponent } from './status.component';
import { UPTIME_SERVICE_MOCK_PROVIDER } from '../../../shared/uptime/uptime.service.mock';
import { TOASTR_SERVICE_MOCK_PROVIDER } from '../../../shared/toastr/toastr.service.mock';
import { UptimeService } from '../../../shared/uptime/uptime.service';
import { ToastrService } from '../../../shared/toastr/toastr.service';

describe('StatusComponent', () => {
  let component: StatusComponent;
  let fixture: ComponentFixture<StatusComponent>;

  let uptimeService: UptimeService;
  let toastrService: ToastrService;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(StatusComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [StatusComponent],
        providers: [
          UPTIME_SERVICE_MOCK_PROVIDER,
          TOASTR_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    toastrService = TestBed.get(ToastrService);

    uptimeService = TestBed.get(UptimeService);
    spyOn(uptimeService, 'getInfras').and.returnValue(Observable.of([]));

    fixture = TestBed.createComponent(StatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set severity as success', () => {
    expect(component.uptimeSeverity).toBe('success');
  });
});
