import { Pipe, PipeTransform } from '@angular/core';

/*
 * Returns some N/A string when empty
 */
@Pipe({ name: 'na' })
export class NaPipe implements PipeTransform {
  transform(value: string | number, naString: string): string | number {
    return ( !value && value !== 0 ) ? naString : value;
  }
}
