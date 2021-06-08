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
    this.route.queryParams.subscribe(({tok, course, action, test}) => {
      this.oAuthService.setToken(tok);
      if (action === 'test') {
        this.router.navigate(['/', 'test', course, test]);
        // res.redirect(`${process.env.FRONT_URL}/test/${objQuery.course}/${objQuery.test}?sub_confirmation=${isSub.id}`)
        return;
      }
      if (action === 'init') {
        this.router.navigate(['/', 'course', course]); // TODO:REVISAR Y COLOCAR UN MIDDLEWARE
        return;
      }
    });
  }

}
