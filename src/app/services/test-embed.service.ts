import {ElementRef, EventEmitter, Injectable} from '@angular/core';
import {Observable, Observer, of} from 'rxjs';
import {FacebookService, InitParams} from 'ngx-facebook';
import {ApiRestService} from './api-rest.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestEmbedService {
  cbLayout: EventEmitter<any> = new EventEmitter<any>();
  cacheDataTest: Array<any> = [];
  fbBootstrap: any;

  constructor(private apiRestService: ApiRestService) {

  }

  loadTest({test}): Observable<any> {
    if (!this.cacheDataTest[test]) {
      return this.apiRestService.getTest({test})
        .pipe(tap(a => this.cacheDataTest[test] = a));
    } else {
      console.log(this.cacheDataTest[test]);
      return of(this.cacheDataTest[test]);
    }
  }

  loadCta({id, ref}): Observable<any> {
    if (!this.cacheDataTest[id]) {
      return this.apiRestService.getCta({id, ref})
        .pipe(tap(a => this.cacheDataTest[id] = a));
    } else {
      console.log(this.cacheDataTest[id]);
      return of(this.cacheDataTest[id]);
    }
  }

}

export class TemplateEmbed {
  mode: boolean;
}
