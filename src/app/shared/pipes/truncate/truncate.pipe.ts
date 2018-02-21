import { Pipe, PipeTransform } from '@angular/core';
/*
 * Truncate a string with ellipsis.
 * Takes a number as an argument which will be used as string length truncate to and puts ellipsis to the end.
 * Cutted last word will be removed.
 * Missing limit or 0 means do not truncate.
 * Usage:
 *   text | truncate: 11
 * Example:
 *   {{ some example text |  truncate: 15}}
 *   truncates to: some example...
 */
@Pipe({ name: 'truncate' })
export class TruncatePipe implements PipeTransform {

  transform(phrase: string, limit = 0, ellipsis = true): string {

    // if null or undefined, return empty string
    if (!phrase) {
      return '';
    }

    // if no limit specified or limit equals 0 or phrase length less then provided limit return phrase as is
    if (!limit || phrase.length <= limit) {
      return phrase;
    }

    if (phrase.length > limit) {
      // cut string to provided length
      phrase = phrase.substr(0, limit);

      // if it is a sentance remove last word
      if (/\s+/.test(phrase)) {
        phrase = phrase.substr(0, phrase.lastIndexOf(' '));
      }

      if (ellipsis) {
        phrase = `${phrase}...`;
      }
    }
    return phrase;
  }

}
