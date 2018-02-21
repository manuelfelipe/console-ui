import { TestBed } from '@angular/core/testing';
import { ProjectManager } from './project.manager';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorageServiceMock } from '../../../testing/mocks/local-storage.mock';
import Spy = jasmine.Spy;

describe('Project Manager Tests', () => {
  let projectManager: ProjectManager;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceMock,
        },
        ProjectManager,
      ],
    });
  });

  beforeEach(() => {
    localStorageService = TestBed.get(LocalStorageService);
    projectManager = TestBed.get(ProjectManager);
  });

  it('should be instantiable', () => {
    expect(projectManager).toBeDefined();
    expect(projectManager).not.toBeNull();
  });

  it('should destroy project', done => {
    const updateProjectSpy = spyOn(projectManager, 'updateProject');
    const updateNamespaceSpy = spyOn(projectManager, 'updateNamespace');
    projectManager.destroy();

    expect(updateProjectSpy).toHaveBeenCalledWith(null);
    expect(updateNamespaceSpy).toHaveBeenCalledWith(null);

    done();
  });

});
