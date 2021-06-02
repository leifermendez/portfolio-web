import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OAuthLmService} from '../oauth-lm.service';

@Component({
  selector: 'app-callback-social',
  templateUrl: './callback-social.component.html',
  styleUrls: ['./callback-social.component.scss']
})
export class CallbackSocialComponent implements OnInit {

  constructor(private route: ActivatedRoute, private oAuthService: OAuthLmService, private router: Router) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({tok, course}) => {
      this.oAuthService.setToken(tok);
      this.router.navigate(['/', 'course', course]);
    });
  }

}
