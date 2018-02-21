import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsumerConfigsComponent } from './consumer-configs.component';
import { Observable } from 'rxjs/Observable';
import { KONG_CONSUMERS } from '../../../../shared/kong/consumer/consumers.data';
import { KongResponseFactory } from '../../../../shared/kong/kong-response.factory';
import { KongRequestFactory } from '../../../../shared/kong/kong-request.factory';
import { KongService } from '../../../../shared/kong/kong.service';
import { KONG_SERVICE_MOCK_PROVIDER } from '../../../../shared/kong/kong.service.mock';
import { ProjectManager } from '../../../../shared/project/project.manager';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import Spy = jasmine.Spy;

describe('ConsumerConfigsComponent', () => {
  let component: ConsumerConfigsComponent;
  let fixture: ComponentFixture<ConsumerConfigsComponent>;

  let kongService: KongService;
  let kongRequestFactory: KongRequestFactory;
  let kongResponseFactory: KongResponseFactory;
  let projectManager: ProjectManager;

  let getConsumersSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(ConsumerConfigsComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [ConsumerConfigsComponent],
        providers: [
          KongRequestFactory,
          KongResponseFactory,
          KONG_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    kongService = TestBed.get(KongService);
    kongRequestFactory = TestBed.get(KongRequestFactory);
    kongResponseFactory = TestBed.get(KongResponseFactory);

    getConsumersSpy = spyOn(kongService, 'getConsumersByNamespace').and.returnValue(Observable.of({ data: KONG_CONSUMERS }));

    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(ConsumerConfigsComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should get consumers', () => {
      const EXPECTED = kongResponseFactory.toConsumers(KONG_CONSUMERS);

      expect(component.consumers).toEqual(EXPECTED);
      expect(getConsumersSpy).toHaveBeenCalled();

      // since we have only 1 consumer, it selects it by default
      expect(component.selectedConsumer).toEqual(component.consumers[0]);
    });
  });

  describe('selectConsumer', () => {
    it('should set selectedConsumer', () => {
      const consumers = kongResponseFactory.toConsumers(KONG_CONSUMERS);

      // was selected by default on init
      expect(component.selectedConsumer).toEqual(consumers[0]);

      component.selectConsumer(consumers[1]);
      expect(component.selectedConsumer).toEqual(consumers[1]);
    });
  });
});
