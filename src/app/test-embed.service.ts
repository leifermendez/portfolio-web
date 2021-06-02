import {ElementRef, EventEmitter, Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {FacebookService, InitParams} from 'ngx-facebook';

@Injectable({
  providedIn: 'root'
})
export class TestEmbedService {
  cbLayout: EventEmitter<any> = new EventEmitter<any>();

  constructor() {

  }

}

export class TemplateEmbed {
  mode: boolean;
}
