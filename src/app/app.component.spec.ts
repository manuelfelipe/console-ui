import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateService } from 'ng2-translate';
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { Observable } from 'rxjs/Observable';
import { AppComponent } from './app.component';
import { TranslateServiceMock } from '../testing/mocks/translate.service.mock';
import { LANGUAGE_SERVICE_MOCK_PROVIDER } from './shared/language/lang.service.mock';
import { LanguageService } from './shared/language/lang.service';
import { UserManager } from './shared/user/user.manager';
import { USER_MANAGER_PROVIDER_MOCK } from './shared/user/user.manager.mock';
import { USER } from './shared/user/user.data';
import { ANGULARTICS_MOCK_PROVIDER } from '../testing/mocks/angulartics/angulartics.mock';
import { ANGULARTICS_GOOGLE_ANALYTICS_MOCK_PROVIDER } from '../testing/mocks/angulartics/angulartics-google-analytics.mock';
import Spy = jasmine.Spy;

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  let userManager: UserManager;
  let angulartics: Angulartics2;
  let angularticsGa: Angulartics2GoogleAnalytics;
  let languageService: LanguageService;
  let translateService: TranslateService;

  let developerModeSpy: Spy;
  let setUsernameSpy: Spy;
  let setDefaultLangSpy: Spy;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(AppComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [
          AppComponent
        ],
        providers: [
          {
            provide: TranslateService,
            useClass: TranslateServiceMock,
          },
          LANGUAGE_SERVICE_MOCK_PROVIDER,
          USER_MANAGER_PROVIDER_MOCK,
          ANGULARTICS_MOCK_PROVIDER,
          ANGULARTICS_GOOGLE_ANALYTICS_MOCK_PROVIDER,
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    languageService = TestBed.get(LanguageService);
    translateService = TestBed.get(TranslateService);

    angulartics = TestBed.get(Angulartics2);
    angularticsGa = TestBed.get(Angulartics2GoogleAnalytics);

    developerModeSpy = spyOn(angulartics, 'developerMode');
    setUsernameSpy = spyOn(angularticsGa, 'setUsername');
    setDefaultLangSpy = spyOn(translateService, 'setDefaultLang');

    userManager = TestBed.get(UserManager);
    userManager.user = Observable.of(USER);

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('ngOnInit', () => {
    it('should setUsername(null)', async(() => {
      spyOn(languageService, 'getLang').and.returnValue(Observable.of(null));
      userManager.user = Observable.of(null);
      component.ngOnInit();

      expect(setUsernameSpy).toHaveBeenCalledWith(null);
    }));

    it('should setUsername(null)', async(() => {
      spyOn(languageService, 'getLang').and.returnValue(Observable.of(null));
      userManager.user = Observable.of(USER);
      component.ngOnInit();

      expect(setUsernameSpy).toHaveBeenCalledWith(USER.username);
    }));

    it('should set developerMode(true), because not in production', async(() => {
      spyOn(languageService, 'getLang').and.returnValue(Observable.of(null));
      component.ngOnInit();

      expect(developerModeSpy).toHaveBeenCalledWith(true);
    }));

    it('should set default lang to `en`, and not call `use` if languageService fails', async(() => {
      const useSpy = spyOn(translateService, 'use');
      spyOn(languageService, 'getLang').and.returnValue(Observable.throw('failed'));
      fixture.detectChanges();

      expect(setDefaultLangSpy).toHaveBeenCalledWith('en');
      expect(useSpy).not.toHaveBeenCalled();
    }));

    it('should set default lang to `en`, and not call `use` if languageService returns null', async(() => {
      const useSpy = spyOn(translateService, 'use');
      spyOn(languageService, 'getLang').and.returnValue(Observable.of(null));
      fixture.detectChanges();

      expect(setDefaultLangSpy).toHaveBeenCalledWith('en');
      expect(useSpy).not.toHaveBeenCalled();
    }));

    it('should set default lang to `en`, and not call `use` if languageService returns `fr`', async(() => {
      const useSpy = spyOn(translateService, 'use');
      spyOn(languageService, 'getLang').and.returnValue(Observable.of('fr'));
      fixture.detectChanges();

      expect(setDefaultLangSpy).toHaveBeenCalledWith('en');
      expect(useSpy).toHaveBeenCalledWith('fr');
    }));
  });

});
