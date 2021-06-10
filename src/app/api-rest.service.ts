import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  public url = environment.api;
  headerUser: HttpHeaders;

  constructor(private http: HttpClient, private cookieService: CookieService) {


  }

  buildHeader(): void {
    const token = this.cookieService.get('token');
    this.headerUser = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  saveToken = (token) => {
    return this.http.post(`${this.url}/save`,
      {
        token
      }
    );
  };

  saveTest = (data) => {
    this.buildHeader();
    return this.http.post(`${this.url}/send-test`, data, {headers: this.headerUser});
  };

  postEmail = (email) => {
    this.buildHeader();
    return this.http.post(`${this.url}/login-email`, {email}, {headers: this.headerUser});
  };


  getProfile = () => {
    this.buildHeader();
    return this.http.get(`${this.url}/profile`, {headers: this.headerUser});
  };

  getTest = (opt?: any) => {
    this.buildHeader();
    const snippet = (opt?.post) ? '&post=true' : '';
    return this.http.get<any>(`${this.url}/test?idTest=${opt.test || ''}${snippet}`, {headers: this.headerUser});
  };

  getCta = (opt?: any) => {
    this.buildHeader();
    return this.http.get<Array<any>>(`${this.url}/cta-fb?id=${opt?.id || ''}`, {headers: this.headerUser});
  };
}
