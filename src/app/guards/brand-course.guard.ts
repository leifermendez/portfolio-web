import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {YoutubeService} from '../services/youtube.service';

@Injectable({
  providedIn: 'root'
})
export class BrandCourseGuard implements CanActivate {

  constructor(private youtubeService: YoutubeService) {


  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // this.getColors(route).then(res => {})
    return this.getColors(route).then(({color, logo, order, title, description}) => {
      route.data = {color, logo, order, title, description};
      return true;
    });

  }


  getBrandColor(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    const myRegexp = /(COLOR)(.*?)(?=\s)/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  }

  getBrandLogo(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    console.log(value);
    const myRegexp = /(LOGO)(.*?)(?=\s)/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  }

  getOrderNumber(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    console.log(value);
    const myRegexp = /(ORDER)(.*?)(?=\s)/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  }

  getTitle(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    console.log(value);
    const myRegexp = /(TITLE:)"(.*?)"/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  }

  getDescription(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    console.log(value);
    const myRegexp = /(TEXT:)"(.*?)"/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  }


  getColors({params, data}): Promise<any> {
    return new Promise((resolve, reject) => {
      const {id} = params;
      this.youtubeService.getDetailPlayList(id).subscribe((res: any) => {
        const {items} = res;
        const {snippet} = items.shift();
        const color = this.getBrandColor(snippet.description);
        const logo = this.getBrandLogo(snippet.description);
        const order = this.getOrderNumber(snippet.description);
        const title = this.getTitle(snippet.description);
        const description = this.getDescription(snippet.description);

        resolve({color, logo, order, title, description});
      }, () => {
        console.log('** ERROR **');
        reject(false);
      });
    });
  }
}
