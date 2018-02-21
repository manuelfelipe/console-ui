import { Pipe, PipeTransform } from '@angular/core';
import { startCase, upperFirst, lowerCase } from 'lodash';

@Pipe({
  name: 'startCase'
})
export class StartCasePipe implements PipeTransform {

  transform(value: string, firstCharOnly: boolean = false): any {
    const lower = lowerCase(value);

    if (firstCharOnly) {
      return upperFirst(lower);
    }

    return startCase(lower);
  }

}
