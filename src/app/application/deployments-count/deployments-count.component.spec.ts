import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { DeploymentsCountComponent } from './deployments-count.component';
import { DRONE_SERVICE_MOCK_PROVIDER } from '../../shared/drone/drone.service.mock';
import { DroneService } from '../../shared/drone/drone.service';

describe('DeploymentsCountComponent', () => {
  let component: DeploymentsCountComponent;
  let fixture: ComponentFixture<DeploymentsCountComponent>;

  let droneService: DroneService;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(DeploymentsCountComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [DeploymentsCountComponent],
        providers: [
          DRONE_SERVICE_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    droneService = TestBed.get(DroneService);
    spyOn(droneService, 'getDeploymentsCount').and.returnValue(Observable.of({ counter: 12 }));

    fixture = TestBed.createComponent(DeploymentsCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get count of deployments', () => {
      expect(component.count).toEqual(12);
    });
  });
});
