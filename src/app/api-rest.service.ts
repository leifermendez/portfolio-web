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

  saveToken = (token) => {
    return this.http.post(`${this.url}/save`,
      {
        token
      }
    );
  };

  getProfile = () => {
    const token = this.cookieService.get('token');
    this.headerUser = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
    return this.http.get(`${this.url}/profile`, {headers: this.headerUser});
  };
}
