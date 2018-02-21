import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { SwaggerComponent } from './swagger.component';
import { SWAGGER_SERVICE_MOCK_PROVIDER } from '../../../shared/swagger/swagger.service.mock';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../shared/project/project.manager.mock';
import { SwaggerService } from '../../../shared/swagger/swagger.service';
import { SwaggerRequestFactory } from '../../../shared/swagger/swagger-request.factory';
import { ProjectManager } from '../../../shared/project/project.manager';

describe('SwaggerComponent', () => {
  let component: SwaggerComponent;
  let fixture: ComponentFixture<SwaggerComponent>;

  let swaggerService: SwaggerService;
  let projectManager: ProjectManager;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(SwaggerComponent, {
        set: {
          template: '<div id="swagger-ui"></div>',
        },
      })
      .configureTestingModule({
        declarations: [SwaggerComponent],
        providers: [
          SWAGGER_SERVICE_MOCK_PROVIDER,
          PROJECT_MANAGER_MOCK_PROVIDER,
          SwaggerRequestFactory,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    swaggerService = TestBed.get(SwaggerService);
    spyOn(swaggerService, 'getSwaggerFile').and.returnValue(Observable.of('http://petstore.swagger.io/v2/swagger.yaml'));

    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(SwaggerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
