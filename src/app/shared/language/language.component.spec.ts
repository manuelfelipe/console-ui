import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { LANGUAGE_SERVICE_MOCK_PROVIDER } from './lang.service.mock';
import { LanguageService } from './lang.service';
import { Observable } from 'rxjs/Observable';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;
  let languageService: LanguageService;

  beforeEach(async(() => {
    TestBed
      .overrideComponent(LanguageComponent, {
        set: {
          template: '',
        },
      })
      .configureTestingModule({
        declarations: [LanguageComponent],
        providers: [
          LANGUAGE_SERVICE_MOCK_PROVIDER,
        ]
      })
      .compileComponents();
  }));

  beforeEach(() => {
    languageService = TestBed.get(LanguageService);
    spyOn(languageService, 'getLang').and.returnValue(Observable.of('fr'));

    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set language when languageService returns', () => {
    expect(component.language).toBe('fr');
  });

  it('should call languageService.setLang', () => {
    const languageServiceSpy = spyOn(languageService, 'setLang');
    fixture.detectChanges();

    component.selectLanguage('es');
    expect(languageServiceSpy).toHaveBeenCalledWith('es');
  });
});
