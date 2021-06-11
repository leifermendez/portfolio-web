import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageDynamicComponent} from './pages/page-dynamic/page-dynamic.component';
import {CourseComponent} from './pages/course/course.component';
import {BrandCourseGuard} from './guards/brand-course.guard';
import {InitTestRunComponent} from './pages/init-test-run/init-test-run.component';
import {CallbackSocialComponent} from './pages/callback-social/callback-social.component';
import {TokenUserGuard} from './guards/token-user.guard';
import {PathRouteComponent} from './pages/path-route/path-route.component';
import {HistoryCourseGuard} from './guards/history-course.guard';
import {TermsAndConditionsComponent} from './pages/terms-and-conditions/terms-and-conditions.component';
import {PrivacyPolicyComponent} from './pages/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackSocialComponent,
    canActivate: [TokenUserGuard]
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
    path: 'terms-and-conditions',
    component: TermsAndConditionsComponent
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    canActivate: [TokenUserGuard, HistoryCourseGuard]
  },
  {
    path: 'course/:id/:test',
    component: CourseComponent,
    canActivate: [TokenUserGuard, HistoryCourseGuard]
  },
  {
    path: 'test/:id/:slug',
    component: InitTestRunComponent,
    canActivate: [TokenUserGuard, HistoryCourseGuard]
  },
  {
    path: 'path-test/:id',
    component: PathRouteComponent,
    canActivate: [TokenUserGuard, HistoryCourseGuard]
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})
  ]
})
export class AppRoutingModule {
}
