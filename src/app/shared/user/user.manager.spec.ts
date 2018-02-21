import { TestBed } from '@angular/core/testing';
import { UserManager } from './user.manager';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorageServiceMock } from '../../../testing/mocks/local-storage.mock';
import Spy = jasmine.Spy;

describe('User Manager Tests', () => {
  let userManager: UserManager;
  let localStorageService: LocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceMock,
        },
        UserManager,
      ],
    });
  });

  beforeEach(() => {
    localStorageService = TestBed.get(LocalStorageService);
    userManager = TestBed.get(UserManager);
  });

  it('should be instantiable', () => {
    expect(userManager).toBeDefined();
    expect(userManager).not.toBeNull();
  });

  it('should destroy user', done => {
    const clearAllSpy = spyOn(localStorageService, 'clearAll');
    userManager.destroy();

    expect(clearAllSpy.calls.count()).toBe(1);
    done();
  });

});
