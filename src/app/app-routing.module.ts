import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageDynamicComponent} from './pages/page-dynamic/page-dynamic.component';
import {CourseComponent} from './pages/course/course.component';
import {BrandCourseGuard} from './brand-course.guard';
import {InitTestRunComponent} from './init-test-run/init-test-run.component';
import {CallbackSocialComponent} from './callback-social/callback-social.component';
import {TokenUserGuard} from './token-user.guard';
import {PathRouteComponent} from './path-route/path-route.component';

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
    path: 'course/:id',
    component: CourseComponent,
    canActivate: [TokenUserGuard]
  },
  {
    path: 'course/:id/:test',
    component: CourseComponent,
    canActivate: [TokenUserGuard]
  },
  {
    path: 'test/:id/:slug',
    component: InitTestRunComponent,
    canActivate: [TokenUserGuard]
  },
  {
    path: 'test',
    component: PathRouteComponent,
    // canActivate: [TokenUserGuard]
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
