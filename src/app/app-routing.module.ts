import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageDynamicComponent} from './pages/page-dynamic/page-dynamic.component';

const routes: Routes = [
  {
    path: '',//<-estatica
    component: HomeComponent
  },
  {
    path: 'about-me', //<-estatica
    component: AboutMeComponent
  },
  {
    path: ':id', //<--- Dinamica
    component: PageDynamicComponent
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
