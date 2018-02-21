import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'millicoresToCores'
})
export class MilliCoresToCoresPipe implements PipeTransform {

  transform(millicores: number, args?: any): any {
    if (!millicores) {
      return 0;
    }

    return millicores / 1000;
  }

}
