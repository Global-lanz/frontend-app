import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sort'
})
export class SortPipe implements PipeTransform {

  transform(value: any[], property: string, order: 'asc'|'desc' = 'asc'): any[] {
    if (!value || !property) return value;

    return value.sort((a,b) => {
      const compare = a[property] > b[property] ? 1 : a[property] < b[property] ? -1 : 0;
      return order === 'asc' ? compare : -compare;
    });
  }
}
