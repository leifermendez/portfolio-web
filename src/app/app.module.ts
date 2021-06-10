import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FacebookModule} from 'ngx-facebook';
import {AppComponent} from './app.component';
import {HeaderComponent} from './components/header/header.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';
import {WorksComponent} from './components/works/works.component';
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
import {ImagBrakeDirective} from './directive/imag-brake.directive';
import {PathLearningComponent} from './components/path-learning/path-learning.component';
import {CourseComponent} from './pages/course/course.component';
import {TopicPipe} from './pipe/topic.pipe';
import {AverageTimePipe} from './pipe/average-time.pipe';
import {NgxLocalStorageModule} from 'ngx-localstorage';
import {NgpSortModule} from 'ngp-sort-pipe';
import {CleanTextPipe} from './pipe/clean-text.pipe';
import {TestEmbedComponent} from './components/test-embed/test-embed.component';
import {SafePipe} from './pipe/safe.pipe';
import {WizardComponent} from './components/wizard/wizard.component';
import {CTAModalComponent} from './components/ctamodal/ctamodal.component';
import {InitTestRunComponent} from './pages/init-test-run/init-test-run.component';
import {VideoPlayerComponent} from './components/video-player/video-player.component';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {CallbackSocialComponent} from './pages/callback-social/callback-social.component';
import {CookieService} from 'ngx-cookie-service';
import {CountdownModule} from 'ngx-countdown';
import {InViewportModule} from 'ng-in-viewport';
import { PathRouteComponent } from './pages/path-route/path-route.component';
import {NgxGraphModule} from '@swimlane/ngx-graph';
import {ReactiveFormsModule} from '@angular/forms';
import {MatTooltipModule} from '@angular/material/tooltip';
import {LoadingBarHttpClientModule} from '@ngx-loading-bar/http-client';

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
    CallbackSocialComponent,
    PathRouteComponent
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
    LoadingBarHttpClientModule,
    InViewportModule,
    NgxGraphModule,
    ReactiveFormsModule,
    MatTooltipModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    AverageTimePipe,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
