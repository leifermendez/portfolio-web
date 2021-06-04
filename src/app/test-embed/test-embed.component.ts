import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import sdk from '@stackblitz/sdk';
import Typewriter from 't-writer.js';
import {TestEmbedService} from '../test-embed.service';
import {FacebookService, InitParams} from 'ngx-facebook';
import {environment} from '../../environments/environment';
import {isPlatformBrowser} from '@angular/common';
import {OAuthLmService, UserModel} from '../oauth-lm.service';
import {ApiRestService} from '../api-rest.service';

@Component({
  selector: 'app-test-embed',
  templateUrl: './test-embed.component.html',
  styleUrls: ['./test-embed.component.scss']
})
export class TestEmbedComponent implements OnInit, AfterViewInit {
  @ViewChild('asCTAText') asCTAText: ElementRef;
  @Input() asDataTest: any;
  @Input() asUser: UserModel;
  url: string;
  fbCta: FbCta = {id: '', mod: ''};
  testCta: any;
  users: Array<any> = [];
  cta = {
    STEP_1: false,
    STEP_2: false,
  };

  initParams: InitParams = {
    appId: environment.fbApp,
    xfbml: true,
    version: 'v10.0'
  };

  constructor(private testEmbedService: TestEmbedService, private fb: FacebookService,
              public oAuthService: OAuthLmService,
              @Inject(PLATFORM_ID) private platformId, private apiRestService: ApiRestService) {

  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.checkTypeCTA();
  }

  checkTypeCTA(): void {
    console.log('**************', this.asDataTest?.testId);
    const ref = this.asDataTest?.testId || null;

    if (ref) {
      if (ref.includes('FB') && ref.includes('POST')) {
        this.fb.init(this.initParams);
        const idCta = ref.split('_').pop();
        this.loadCta(idCta, 'posts');
      }

      if (ref.includes('FB') && ref.includes('VIDEO')) {
        this.fb.init(this.initParams);
        const idCta = ref.split('_').pop();
        this.loadCta(idCta, 'videos');
      }

      if (ref.includes('STACK')) {
        const idCta = ref.split('_').pop();
        this.loadTest(idCta);
      }
    }
  }


  loadCta(id, mode): void {

    this.testEmbedService.loadCta({id, ref: 'fb'})
      .subscribe(({page}) => {
        this.fbCta = {mod: mode, id: `${page}/${mode}/${id}`};
        this.fb.init(this.initParams);
      });
  }

  loadTest(id): void {
    this.testEmbedService.loadTest({test: id})
      .subscribe(res => {
        console.log(res);
        this.users = [...res.participants];
        this.fbCta = {mod: 'test', id: res.link};
      });
  }

  initEffect = () => {
    // console.log(this.asCTAText);
    const target = this.asCTAText.nativeElement;
    const writer = new Typewriter(target, {
      loop: false,
      typeSpeed: 60,
      typeColor: '#1a1a1a'
    });
    console.log('target', target);
    writer
      // .changeCursorColor('white')
      .type(' LEIFER MENDEZ <br>')
      .type('Comenta "info" y recibe el link de tu prueba')
      .start();

  };

  changeCta({cta, mode}): void {

    this.cta[cta] = mode;
    if (isPlatformBrowser(this.platformId)) {
      // setTimeout(() => {
      //   this.initEffect();
      // }, 250);
    }
  }

  buildTest(): void {
    this.testEmbedService.cbLayout.emit({mode: true, test: this.asDataTest});
  }

  onVideoEvent(paused: string): void {

  }
}

export class FbCta {
  mod: string;
  id: string;
}
