import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {OAuthLmService} from '../services/oauth-lm.service';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TokenUserGuard implements CanActivate {

  constructor(private oAuthService: OAuthLmService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkToken();
  }

  checkToken(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.oAuthService.getCurrentUser()
        .pipe(
          tap(a => {
            if (!a) {
              this.oAuthService.removeToken();
            } else {
              this.oAuthService.currentUser = a;
            }
          })
        ).subscribe(() => resolve(true)
        , () => resolve(true));
    });

  }

}
