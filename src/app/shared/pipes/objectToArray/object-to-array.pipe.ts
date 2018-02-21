import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectToArray'
})
export class ObjectToArrayPipe implements PipeTransform {

  transform(object: Object): { key: string; value: any }[] {
    const keys = [];

    if (!object) {
      return keys;
    }

    const valueKeys = Object.keys(object);

    for (let i = 0; i < valueKeys.length; ++i) {
      const key = valueKeys[i];
      keys.push({ key: key, value: object[key] });
    }

    return keys;
  }

}
