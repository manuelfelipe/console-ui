import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LanguageService {
  private readonly LANG_PARAM_NAME = 'language';
  private subject: BehaviorSubject<string> = new BehaviorSubject<string>(null);

  constructor(private localStorageService: LocalStorageService) {
    const lang: string = this.localStorageService.get<string>(this.LANG_PARAM_NAME);
    lang ? this.setLang(lang) : this.setLang('en');
  }

  getLang(): Observable<string> {
    return this.subject.asObservable();
  }

  setLang(lang: string) {
    this.localStorageService.set(this.LANG_PARAM_NAME, lang.toLowerCase());
    this.subject.next(lang);
  }
}
