import { Component, OnInit } from '@angular/core';
import { TranslateService } from 'ng2-translate';
import { ToasterConfig } from 'angular2-toaster';
import { Angulartics2, Angulartics2GoogleAnalytics } from 'angulartics2';
import { get } from 'lodash';
import { LanguageService } from './shared/language/lang.service';
import { environment } from 'environments/environment';
import { UserManager } from './shared/user/user.manager';
import '../rxjs-operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  // used in html only
  toasterConfig: ToasterConfig = new ToasterConfig({
    showCloseButton: false,
    mouseoverTimerStop: true,
    positionClass: 'toast-top-center'
  });

  constructor(private translateService: TranslateService,
              private languageService: LanguageService,
              private userManager: UserManager,
              private angulartics: Angulartics2,
              private ga: Angulartics2GoogleAnalytics) {
  }

  ngOnInit() {
    this.userManager.user
      .subscribe(user => this.ga.setUsername(get<string>(user, 'username', null)));

    if (!environment.production) {
      this.angulartics.developerMode(true);
    }

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translateService.setDefaultLang('en');

    this.languageService.getLang()
      .filter(lang => !!lang)
      .subscribe(lang => {
          this.translateService.use(lang);
        },
        error => {
          console.log('Error getting language param', error);
        });
  }
}
