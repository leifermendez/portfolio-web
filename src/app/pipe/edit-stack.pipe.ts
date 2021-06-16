import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'editStack'
})
export class EditStackPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    try {
      const edit = value.split('.').shift().split('/').pop();
      console.log(edit);
      return `//stackblitz.io/edit/${edit}`;
    } catch (e) {
      return value;
    }
  }

}
