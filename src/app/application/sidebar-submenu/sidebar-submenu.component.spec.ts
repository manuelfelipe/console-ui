import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { SidebarSubmenuComponent } from './sidebar-submenu.component';
import { ProjectResponseFactory } from '../../shared/project/project-response.factory';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../shared/project/project.manager.mock';
import { ProjectManager } from '../../shared/project/project.manager';

describe('SidebarSubmenuComponent', () => {
  let component: SidebarSubmenuComponent;
  let fixture: ComponentFixture<SidebarSubmenuComponent>;

  let projectManager: ProjectManager;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(SidebarSubmenuComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [SidebarSubmenuComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
          ProjectResponseFactory,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');
    projectManager.project = Observable.of({
      repository: {
        owner: 'CLOUD',
        name: 'console-server'
      }
    });

    fixture = TestBed.createComponent(SidebarSubmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
