import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { UptimeNamespaceComponent } from './uptime-namespace.component';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../../shared/project/project.manager';

describe('UptimeNamespaceComponent', () => {
  let component: UptimeNamespaceComponent;
  let fixture: ComponentFixture<UptimeNamespaceComponent>;

  let projectManager: ProjectManager;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(UptimeNamespaceComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [UptimeNamespaceComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(UptimeNamespaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
