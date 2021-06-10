import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'cleanText'
})
export class CleanTextPipe implements PipeTransform {

  transform(value: string, args: any = null): unknown {
    try {
      // console.log('--->', args);
      value = value.replace(/(\r\n|\n|\r)/gm, '****');
      // console.log(value);
      const myRegexp = /(TITLE)(.*?)(?=\s)/gm;
      const match = myRegexp.exec(value) || [];
      // console.log('***', match);
      return value.replace(/[^0-9a-zA-Z.áéíóúÁÉÍÓÚâêîôÂÊÎÔãõÃÕçÇ ]/g, '');
    } catch (e) {
      return null;
    }
  }

}
