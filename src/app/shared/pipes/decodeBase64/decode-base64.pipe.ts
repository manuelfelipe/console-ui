import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'decodeBase64'
})
export class DecodeBase64Pipe implements PipeTransform {

  transform(base64encoded: any, args?: any): string {
    if (!base64encoded) {
      return null;
    }

    return atob(base64encoded);
  }

}
