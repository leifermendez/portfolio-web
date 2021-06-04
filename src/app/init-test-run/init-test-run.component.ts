import {AfterViewInit, Component, OnInit} from '@angular/core';
import sdk from '@stackblitz/sdk';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FacebookService, InitParams} from 'ngx-facebook';
import {CountdownEvent} from 'ngx-countdown';
import {OAuthLmService, UserModel} from '../oauth-lm.service';
import {ApiRestService} from '../api-rest.service';

@Component({
  selector: 'app-init-test-run',
  templateUrl: './init-test-run.component.html',
  styleUrls: ['./init-test-run.component.scss']
})
export class InitTestRunComponent implements OnInit, AfterViewInit {
  urlLoginFb: string;
  readonly urlYoutube = 'https://www.youtube.com/channel/UCgrIGp5QAnC0J8LfNJxDRDw?sub_confirmation=1';
  initParams: InitParams = {
    appId: environment.fbApp,
    xfbml: true,
    version: 'v10.0'
  };
  idCourse: string;
  idTest: string;
  subConfirmation = null;
  currentUser: UserModel;
  urlStack: string;

  constructor(private route: ActivatedRoute, private fb: FacebookService, private oAuthService: OAuthLmService,
              private apiRest: ApiRestService) {
  }

  ngOnInit(): void {
    this.fb.init(this.initParams);
    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.idTest = this.route.snapshot.paramMap.get('slug');
    this.subConfirmation = this.oAuthService.currentUser?.isSub;
    this.urlLoginFb = `${environment.api}/login-google?course=${this.idCourse}&test=${this.idTest}`;
    if (this.subConfirmation) {
      setTimeout(() => this.openRun(), 3000);
    }

    this.loadTest(this.idTest);
  }

  ngAfterViewInit(): void {

  }

  loadTest(id): void {
    this.apiRest.getTest({test: id}).subscribe(({stack}) => {
      this.urlStack = stack;
    });
  }

  openRun(): any {
    // @ts-ignore
    // sdk.openProject(this.project);
    sdk.openGithubProject(this.urlStack, {
      newWindow: false,
      initialPath: `?course=${this.idCourse}&test=${this.idTest}`
    });
  }


  handleEvent($event: CountdownEvent): any {
    if ($event.action === 'done') {
      this.openRun();
    }

  }


}
