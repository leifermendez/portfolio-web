import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {
  private readonly urlMain = 'https://youtube.googleapis.com/youtube/v3/playlists?key=AIzaSyC14wybawh7qeY2qyPO5LDpW6NothdvUAg';
  private readonly urlDetail = 'https://youtube.googleapis.com/youtube/v3/playlistItems?key=AIzaSyC14wybawh7qeY2qyPO5LDpW6NothdvUAg';

  constructor(private httpModule: HttpClient) {
  }

  loadCourses = () => {
    const query = [
      this.urlMain,
      `&part=id,snippet,contentDetails,status&channelId=UCgrIGp5QAnC0J8LfNJxDRDw`,
      `&maxResults=50`
    ].join('');
    return this.httpModule.get(query)
      .pipe(
        map((item: any) => item.items.reverse()),
        map((item: any) => item.filter(value => value.snippet.description.toLowerCase().includes('curso'))),
        map((item: any) => {
          return item.map(i => {
            const myRegexTag = /^(TAG).(\S+)/gm;
            const matchTag = myRegexTag.exec(i.snippet.description) || [];
            i.tag = matchTag.reverse().shift();

            const myRegexp = /^(COVER).(\S+)/gm;
            const match = myRegexp.exec(i.snippet.description) || [];
            i.cover = match.reverse().shift();
            /**/
            const myRegexpOrder = /^(ORDER).(\S+)/gm;
            const matchOrder = myRegexpOrder.exec(i.snippet.description) || [];
            // tslint:disable-next-line:radix
            i.order = parseInt(matchOrder.reverse().shift()) || 999;

            return i;
          });
        }),
      );
  };

  loadPlayList = (id: string) => {
    const query = [
      this.urlDetail,
      `&part=snippet,contentDetails,status&channelId=UCgrIGp5QAnC0J8LfNJxDRDw`,
      `&maxResults=50&playlistId=${id}`
    ].join('');
    return this.httpModule.get(query)
      .pipe(
        map((item: any) => item.items)
      );
  };

  getDetailPlayList = (id: string) => {
    const query = [
      this.urlMain,
      `&part=id,snippet,contentDetails`,
      `&id=${id}`
    ].join('');
    return this.httpModule.get(query);
  };
}
