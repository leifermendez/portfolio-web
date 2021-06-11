import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'evenOdd'
})
export class EvendOddPipe implements PipeTransform {

  transform(value: number, args: any): any {
    return value % Number(args);
  }

}
