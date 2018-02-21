import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bytesToMegabytes'
})
export class BytesToMegabytesPipe implements PipeTransform {

  transform(bytes: number, args?: any): any {
    if (!bytes) {
      return 0;
    }

    return Math.round(bytes / 1000 / 1000);
  }

}
