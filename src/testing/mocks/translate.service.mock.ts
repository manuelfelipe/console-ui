export class TranslateServiceMock {
  setDefaultLang(lang: string): void {
    throw new Error('TranslateServiceMock.setDefaultLang unimplemented');
  }

  use(lang: string): void {
    throw new Error('TranslateServiceMock.use unimplemented');
  }
}
