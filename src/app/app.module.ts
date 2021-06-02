import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FacebookModule} from 'ngx-facebook';
import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {WorksComponent} from './works/works.component';
import {HttpClientModule} from '@angular/common/http';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {PERFECT_SCROLLBAR_CONFIG} from 'ngx-perfect-scrollbar';
import {PerfectScrollbarConfigInterface} from 'ngx-perfect-scrollbar';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatTabsModule} from '@angular/material/tabs';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {ConnectionServiceModule} from 'ngx-connection-service';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {AboutMeComponent} from './pages/about-me/about-me.component';
import {PageDynamicComponent} from './pages/page-dynamic/page-dynamic.component';
import {ImagBrakeDirective} from './imag-brake.directive';
import {PathLearningComponent} from './path-learning/path-learning.component';
import {CourseComponent} from './pages/course/course.component';
import {TopicPipe} from './topic.pipe';
import {AverageTimePipe} from './average-time.pipe';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import {NgpSortModule} from 'ngp-sort-pipe';
import {CleanTextPipe} from './clean-text.pipe';
import {TestEmbedComponent} from './test-embed/test-embed.component';
import {SafePipe} from './safe.pipe';
import {WizardComponent} from './wizard/wizard.component';
import {CTAModalComponent} from './ctamodal/ctamodal.component';
import {InitTestRunComponent} from './init-test-run/init-test-run.component';
import {VideoPlayerComponent} from './video-player/video-player.component';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {CallbackSocialComponent} from './callback-social/callback-social.component';
import {CookieService} from 'ngx-cookie-service';
import {CountdownModule} from 'ngx-countdown';
import {InViewportModule} from 'ng-in-viewport';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    WorksComponent,
    HomeComponent,
    AboutMeComponent,
    PageDynamicComponent,
    ImagBrakeDirective,
    PathLearningComponent,
    CourseComponent,
    TopicPipe,
    AverageTimePipe,
    CleanTextPipe,
    TestEmbedComponent,
    SafePipe,
    WizardComponent,
    CTAModalComponent,
    InitTestRunComponent,
    VideoPlayerComponent,
    CallbackSocialComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'serverApp'}),
    HttpClientModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    MatTabsModule,
    ConnectionServiceModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {enabled: environment.production, registrationStrategy: 'registerImmediately'}),
    AppRoutingModule,
    RouterModule,
    NgxYoutubePlayerModule.forRoot(),
    FacebookModule.forRoot(),
    NgxLocalStorageModule.forRoot(),
    NgpSortModule,
    CountdownModule,
    InViewportModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
