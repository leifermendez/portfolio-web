import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class HistoryCourseGuard implements CanActivate {

  constructor(private cookieService: CookieService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.setHistory(route);
  }


  setHistory(route: ActivatedRouteSnapshot): boolean {
    const course = route.paramMap.get('id');
    const idCourse = route.paramMap.get('slug');
    if (course) {
      this.cookieService.set('history_course', course, 1, '/');
    }
    if (idCourse) {
      this.cookieService.set('history_course_id', idCourse, 1, '/');
    }
    return true;
  }

}
