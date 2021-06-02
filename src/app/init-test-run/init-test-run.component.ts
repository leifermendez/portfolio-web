import {AfterViewInit, Component, OnInit} from '@angular/core';
import sdk from '@stackblitz/sdk';
import {environment} from '../../environments/environment';
import {ActivatedRoute} from '@angular/router';
import {FacebookService, InitParams} from 'ngx-facebook';
import {CountdownEvent} from 'ngx-countdown';
import {OAuthLmService, UserModel} from '../oauth-lm.service';

@Component({
  selector: 'app-init-test-run',
  templateUrl: './init-test-run.component.html',
  styleUrls: ['./init-test-run.component.scss']
})
export class InitTestRunComponent implements OnInit {
  project: any;
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

  constructor(private route: ActivatedRoute, private fb: FacebookService, private oAuthService: OAuthLmService) {
  }

  ngOnInit(): void {
    this.fb.init(this.initParams);
    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.idTest = this.route.snapshot.paramMap.get('slug');
    this.subConfirmation = this.route.snapshot.queryParamMap.get('sub_confirmation');
    this.subConfirmation = (this.subConfirmation === null) ? null : isNaN(this.subConfirmation);
    this.urlLoginFb = `${environment.api}/login-google?course=${this.idCourse}&test=${this.idTest}`;
    this.oAuthService.getCurrentUser().subscribe(res => this.currentUser = res);

    if (this.subConfirmation) {
      setTimeout(() => this.openRun(), 3000);
    }

  }

  openRun(): any {
    // @ts-ignore
    // sdk.openProject(this.project);
    sdk.openGithubProject('leifermendez/angular-buscador', {
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
