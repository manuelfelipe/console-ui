import { TestBed } from '@angular/core/testing';
import { DomSanitizer } from '@angular/platform-browser';
import { TrustHtmlPipe } from './trust-html.pipe';

describe('TrustHtmlPipe', () => {
  let pipe: TrustHtmlPipe;
  let sanitizer: DomSanitizer;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TrustHtmlPipe,
        DomSanitizer,
      ],
    });
  });

  beforeEach(() => {
    sanitizer = TestBed.get(DomSanitizer);
    spyOn(sanitizer, 'bypassSecurityTrustHtml').and.returnValue('<span>SafeHTML</span>');

    pipe = TestBed.get(TrustHtmlPipe);
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return safe html', () => {
    expect(pipe.transform('<span></span>')).toBe('<span>SafeHTML</span>');
  });
});
