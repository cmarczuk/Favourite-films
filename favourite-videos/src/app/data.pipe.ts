import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'data'
})
export class DataPipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    return value.getFullYear() + "-" + value.getMonth() + "-" + value.getDay();
  }

}
