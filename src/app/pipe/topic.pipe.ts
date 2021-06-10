import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'topic'
})
export class TopicPipe implements PipeTransform {

  transform(value: string): unknown {
    try {

      value = value.replace(/(\r\n|\n|\r)/gm, '****');
      const myRegexp = /(0:00 Intro).*(---)/gm;
      const match = myRegexp.exec(value) || [];
      const line = match[0];
      const list = line.split('****');
      // list.shift();
      list.pop();
      return list;
    } catch (e) {
      return [];
    }

  }

}
