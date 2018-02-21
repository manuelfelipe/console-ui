import { Component, OnInit } from '@angular/core';
import { LanguageService } from './lang.service';

@Component({
  selector: 'app-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  language: string;

  constructor(private languageService: LanguageService) {
  }

  ngOnInit() {
    this.languageService.getLang()
      .subscribe(lang => this.language = lang);
  }

  selectLanguage(lang): void {
    this.languageService.setLang(lang);
  }
}
