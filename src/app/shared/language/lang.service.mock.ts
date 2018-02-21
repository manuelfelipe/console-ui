import { Observable } from 'rxjs/Observable';
import { LanguageService } from './lang.service';

class LanguageServiceMock {
  init(): void {
    throw new Error('LanguageServiceMock.init unimplemented');
  }

  getLang(): Observable<string> {
    return Observable.throw(new Error('LanguageServiceMock.getLang unimplemented'));
  }

  setLang(lang: string): void {
    throw new Error('LanguageServiceMock.setLang unimplemented');
  }
}

export const LANGUAGE_SERVICE_MOCK_PROVIDER = {
  provide: LanguageService,
  useClass: LanguageServiceMock,
};
