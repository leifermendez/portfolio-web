import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import sdk from '@stackblitz/sdk';
import Typewriter from 't-writer.js';
import {TestEmbedService} from '../test-embed.service';
import {FacebookService, InitParams} from 'ngx-facebook';
import {environment} from '../../environments/environment';
import {isPlatformBrowser} from '@angular/common';
import {UserModel} from '../oauth-lm.service';
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
  project: any;
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
              @Inject(PLATFORM_ID) private platformId, private apiRestService: ApiRestService) {

  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {

    this.users = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

    this.project = {
      files: {
        'index.ts': 'code',
        'index.html': 'html'
      },
      title: 'Dynamically Generated Project',
      description: 'Created with <3 by the StackBlitz SDK!',
      template: 'typescript',
      tags: ['stackblitz', 'sdk'],
      dependencies: {
        moment: '*' // * = latest version
      }
    };

    console.log(this.asDataTest);
    this.testEmbedService.loadTest({test: this.asDataTest?.testId})
      .subscribe(res => this.users = res);

    // @ts-ignore


    // this.url = 'https://stackblitz.com/edit/sdk-create-project?embed=1&file=index.ts';
    // this.loadEmbed();
  }

  openRun(): any {
    // @ts-ignore
    // sdk.openProject(this.project);
    sdk.openGithubProject('leifermendez/angular-validacion-async');
  }

  initEffect = () => {

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


    this.fb.init(this.initParams);

    this.cta[cta] = mode;
    if (isPlatformBrowser(this.platformId)) {
      setTimeout(() => {
        this.initEffect();
      }, 250);
    }
  }

  buildTest(): void {
    this.testEmbedService.cbLayout.emit({mode: true, test: this.asDataTest});
  }

  onVideoEvent(paused: string): void {

  }
}
