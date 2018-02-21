import { Pipe, PipeTransform } from '@angular/core';
import { toString } from 'cronstrue';

@Pipe({
  name: 'cronToText'
})
export class CronToTextPipe implements PipeTransform {

  transform(cron: string): any {
    try {
      return toString(cron);
    } catch (e) {
      return '';
    }
  }

}
