import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  private readonly url = 'https://api.github.com/users/leifermendez/repos';
  private readonly urlContent = 'https://raw.githubusercontent.com/wiki/leifermendez';
  private readonly urlRepoProfile = 'https://api.github.com/repos/leifermendez/portfolio-web';
  private headers: any;

  constructor(private httpClient: HttpClient) {
    this.headers = {
      headers: new HttpHeaders({
        Authorization: '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',
        'Content-Type': 'application/json'
      })
    };
  }

  loadRepos = () => {
    return this.httpClient.get(`${this.url}?type=owner&per_page=100`, this.headers)
      .pipe(
        map((item: any) => item.filter(value => !value.fork)),
        map((item: any) => item.filter(value => (value.stargazers_count > 3)))
      );
  };

  getImage = (text: string) => {
    try {
      return text.match(/!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/);
    } catch (e) {
      return null;
    }
  };

  getRepo = () => {
    try {
      return this.httpClient.get(this.urlRepoProfile);
    } catch (e) {
      return null;
    }
  };

  buildHome = (repo: string) => {
    let urlContent = this.urlContent;
    // console.log(this.getImage(repo))
    return urlContent += `${repo}/Home.md`;
  };

  loadAboutMe = () => {
    return this.httpClient.get('https://gist.githubusercontent.com/leifermendez/668ed1dbd6e21923ee58eef623630a54/raw/e5e7fb0b3d7b82ea2341f2d1d5b9c43b7a653d6d/about-me.json');
  };
}
