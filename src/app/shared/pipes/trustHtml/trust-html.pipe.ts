import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'trustHtml'
})
export class TrustHtmlPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer) {
  }

  transform(html: string, args?: any): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

}
