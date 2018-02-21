import { async, TestBed } from '@angular/core/testing';
import { LanguageService } from './lang.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { LocalStorageServiceMock } from '../../../testing/mocks/local-storage.mock';

describe('Language Service tests', () => {
  let languageService: LanguageService;
  let localStorageService: LocalStorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        LanguageService,
        {
          provide: LocalStorageService,
          useClass: LocalStorageServiceMock,
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    localStorageService = TestBed.get(LocalStorageService);
    languageService = new LanguageService(localStorageService);
  });

  it('should be instantiable', () => {
    expect(languageService).toBeDefined();
  });

  it('should be initialized with en when nothing in local storage', () => {
    spyOn(localStorageService, 'get').and.returnValue(null);

    languageService.getLang()
      .subscribe(lang => {
        expect(lang).toEqual('en');
      });
  });

  it('should be initialized with `es` when local storage returns `es`', () => {
    spyOn(localStorageService, 'get').and.returnValue('es');
    const setLocalStorageSpy = spyOn(localStorageService, 'set');

    languageService = new LanguageService(localStorageService);

    languageService.getLang()
      .subscribe(lang => {
        expect(lang).toEqual('es');
        expect(setLocalStorageSpy).toHaveBeenCalledWith('language', 'es');
      });
  });

  it('should be setting language', () => {
    spyOn(localStorageService, 'get').and.returnValue('en');
    const setLocalStorageSpy = spyOn(localStorageService, 'set');

    languageService.setLang('fr');

    languageService.getLang()
      .subscribe(lang => {
        expect(lang).toEqual('fr');
        expect(setLocalStorageSpy).toHaveBeenCalledWith('language', 'fr');
      });
  });
});
