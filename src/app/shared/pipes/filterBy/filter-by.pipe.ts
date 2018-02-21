import { Pipe, PipeTransform } from '@angular/core';
import { isPlainObject } from 'lodash';

@Pipe({
  name: 'filterBy',
  pure: false
})
export class FilterByPipe implements PipeTransform {

  transform(items: any[], filters: Object | string, isInclude: boolean = true): any {
    if (!items || !filters) {
      return items;
    }

    let filteredItems = [...items];

    if (isPlainObject(filters)) {
      const keys = Object.keys(filters);

      // filter items array, items which match and return true will be kept, false will be filtered out
      keys.forEach((key) => {
        if (isInclude) {
          filteredItems = filteredItems.filter(item => (filters[key] || filters[key] === 0) ? item[key] === filters[key] : true);
        } else {
          filteredItems = filteredItems.filter(item => (filters[key] || filters[key] === 0) ? item[key] !== filters[key] : true);
        }
      });
    } else {
      if (isInclude) {
        filteredItems = filteredItems.filter(item => item.includes(filters));
      } else {
        filteredItems = filteredItems.filter(item => !item.includes(filters));
      }
    }

    return filteredItems;
  }

}
