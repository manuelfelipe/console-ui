import { Pipe, PipeTransform } from '@angular/core';

// dirty hack to support 'require'
declare const require: any;

const ansiHTML = require('ansi-html');

@Pipe({
  name: 'ansiToHtml'
})
export class AnsiToHtmlPipe implements PipeTransform {

  transform(ansi: string, args?: any): string {
    if (!ansi) {
      return '';
    }

    return ansiHTML(ansi);
  }

}
