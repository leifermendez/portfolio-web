import {Component, Input, OnInit} from '@angular/core';
import {FacebookService, InitParams, UIParams, UIResponse} from 'ngx-facebook';
import {environment} from '../../environments/environment';
import {OAuthLmService, UserModel} from '../oauth-lm.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-ctamodal',
  templateUrl: './ctamodal.component.html',
  styleUrls: ['./ctamodal.component.scss']
})
export class CTAModalComponent implements OnInit {
  currentUser: UserModel;
  idCourse: string;

  constructor(private fb: FacebookService, public oAuthService: OAuthLmService, private route: ActivatedRoute,
              private router: Router) {
    const initParams: InitParams = {
      appId: environment.fbApp,
      xfbml: true,
      version: 'v10.0'
    };

    fb.init(initParams);
  }

  ngOnInit(): void {
    this.oAuthService.getCurrentUser().subscribe(res => this.currentUser = res);
    this.idCourse = this.route.snapshot.paramMap.get('id');

  }


  share(): void {

    const options: UIParams = {
      method: 'share',
      href: 'https://www.facebook.com/leifermendez.dev/posts/140728194756153'
    };

    this.fb.ui(options)
      .then((res: UIResponse) => {
        this.router.navigate(['/', 'course', this.idCourse]);
      })
      .catch(this.handleError);

  }

  handleError(handleError: any): void {
    throw new Error('Method not implemented.');
  }
}
