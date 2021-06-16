import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  public url = environment.api;
  headerUser: HttpHeaders;

  constructor(private http: HttpClient, private cookieService: CookieService) {


  }

  buildHeader(loading = true): void {
    const token = this.cookieService.get('token');
    let preHeader = {
      Authorization: `Bearer ${token}`,
      ignoreLoadingBar: ''
    };

    if (!loading) {
      preHeader = {...preHeader, ...{ignoreLoadingBar: ``}};
    }
    this.headerUser = new HttpHeaders(preHeader);
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
    this.buildHeader(false);
    const snippet = (opt?.post) ? '&post=true' : '';
    return this.http.get<any>(`${this.url}/test?idTest=${opt.test || ''}${snippet}`, {
      headers: this.headerUser
    });
  };

  getCta = (opt?: any) => {
    this.buildHeader(false);
    return this.http.get<Array<any>>(`${this.url}/cta-fb?id=${opt?.id || ''}`, {headers: this.headerUser});
  };

  getMembers = (opt?: any) => {
    this.buildHeader(false);
    return this.http.get<Array<any>>(`${this.url}/members`, {headers: this.headerUser});
  };

  getParticipants = (course) => {
    this.buildHeader(false);
    return this.http.get<Array<any>>(`${this.url}/participants?course=${course}`, {headers: this.headerUser});
  };
}
