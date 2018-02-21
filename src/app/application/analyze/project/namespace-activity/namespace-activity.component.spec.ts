import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NamespaceActivityComponent } from './namespace-activity.component';
import { PROJECT_MANAGER_MOCK_PROVIDER } from '../../../../shared/project/project.manager.mock';
import { ProjectManager } from '../../../../shared/project/project.manager';
import { Observable } from 'rxjs/Observable';

describe('NamespaceActivityComponent', () => {
  let component: NamespaceActivityComponent;
  let fixture: ComponentFixture<NamespaceActivityComponent>;

  let projectManager: ProjectManager;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(NamespaceActivityComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [NamespaceActivityComponent],
        providers: [
          PROJECT_MANAGER_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    projectManager = TestBed.get(ProjectManager);
    projectManager.namespace = Observable.of('console-server');

    fixture = TestBed.createComponent(NamespaceActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set namespace', () => {
      expect(component.namespace).toBe('console-server');
    });
  });
});
