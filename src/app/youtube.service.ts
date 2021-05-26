import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly url = 'https://youtube.googleapis.com/youtube/v3/playlists?key=AIzaSyC14wybawh7qeY2qyPO5LDpW6NothdvUAg';

  constructor(private httpModule: HttpClient) {
  }

  loadCourses = () => {
    const query = [
      this.url,
      `&part=id,snippet,contentDetails,status&channelId=UCgrIGp5QAnC0J8LfNJxDRDw`,
      `&maxResults=50`
    ].join('');
    return this.httpModule.get(query)
      .pipe(
        map((item: any) => item.items.reverse()),
        map((item: any) => item.filter(value => value.snippet.description.toLowerCase().includes('curso'))),
        map((item: any) => {
          return item.map(i => {
            const myRegexp = /^(COVER).(\S+)/gm;
            const match = myRegexp.exec(i.snippet.description) || [];
            i.cover = match.reverse().shift();
            return i;
          });
        }),
      );
  };
}
