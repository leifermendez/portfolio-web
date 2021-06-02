import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageDynamicComponent} from './pages/page-dynamic/page-dynamic.component';
import {CourseComponent} from './pages/course/course.component';
import {BrandCourseGuard} from './brand-course.guard';
import {InitTestRunComponent} from './init-test-run/init-test-run.component';
import {CallbackSocialComponent} from './callback-social/callback-social.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'callback',
    component: CallbackSocialComponent
  },
  {
    path: 'about-me',
    component: AboutMeComponent
  },
  {
    path: 'course/:id',
    component: CourseComponent,
    // canActivate: [BrandCourseGuard]
  },
  {
    path: 'course/:id/:user/:test',
    component: CourseComponent,
  },
  {
    path: 'test/:id/:slug',
    component: InitTestRunComponent,
  }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule {
}
