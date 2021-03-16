import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiRestService {
  public url = 'http://localhost:9000';

  constructor(private http: HttpClient) {
  }

  saveToken = (token) => {
    return this.http.post(`${this.url}/save`,
      {
        token
      }
    );
  };
}
