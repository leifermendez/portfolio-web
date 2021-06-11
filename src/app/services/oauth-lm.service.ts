import {Injectable} from '@angular/core';
import {CookieService} from 'ngx-cookie-service';
import {ApiRestService} from './api-rest.service';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OAuthLmService {
  public terms = true;
  public checkSession = false;
  public currentUser = null;
  sessionEmail: boolean;
  public cbTest: ResTest = {id: '', user: '', test: ''};

  constructor(private cookieService: CookieService, private apiRestService: ApiRestService) {
  }

  setToken(token: any): void {
    this.cookieService.set('token', token, 4, '/');
  }

  removeToken(): void {
    this.cookieService.delete('token', '/');
  }

  getCurrentUser(): Observable<any> {
    return this.apiRestService.getProfile()
      .pipe(tap((res) => {
        this.currentUser = res;
        this.checkSession = true;
      }));
  }
}


export class ResTest {
  id: string;
  test: string;
  user: string;
}

export class UserModel {
  name?: string;
  id?: string;
  avatar?: string;
  emails?: string;
}
