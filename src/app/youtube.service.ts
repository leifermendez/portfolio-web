import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly url = 'https://youtube.googleapis.com/youtube/v3/playlists?key=AIzaSyC14wybawh7qeY2qyPO5LDpW6NothdvUAg';

  constructor(private httpModule: HttpClient) {
  }

  loadCourses = () => {
    const query = [this.url, `&part=id%2Csnippet&channelId=UCgrIGp5QAnC0J8LfNJxDRDw&`].join('');
    return this.httpModule.get(query)
      .pipe(map((item: any) => item.items));
  };
}