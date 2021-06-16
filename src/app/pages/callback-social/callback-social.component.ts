import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {OAuthLmService} from '../../services/oauth-lm.service';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-callback-social',
  templateUrl: './callback-social.component.html',
  styleUrls: ['./callback-social.component.scss']
})
export class CallbackSocialComponent implements OnInit {

  constructor(private route: ActivatedRoute, private oAuthService: OAuthLmService, private router: Router,
              private cookieService: CookieService) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(({tok, course, action, test}) => {
      // console.log('---->', tok);
      this.oAuthService.setToken(tok);
      const idHistoryCourse = this.cookieService.get('history_course');
      const testHistoryCourse = this.cookieService.get('history_course_id');
      console.log(action, idHistoryCourse, testHistoryCourse);
      this.delayAndRedirect(testHistoryCourse, idHistoryCourse);
    });
  }

  delayAndRedirect(testHistoryCourse, idHistoryCourse): void {
    setTimeout(() => {
      if (testHistoryCourse.length) {
        this.router.navigate(['/', 'test', idHistoryCourse, testHistoryCourse]);
        // res.redirect(`${process.env.FRONT_URL}/test/${objQuery.course}/${objQuery.test}?sub_confirmation=${isSub.id}`)
        return;
      }
      if (!testHistoryCourse.length) {
        this.router.navigate(['/', 'course', idHistoryCourse]); // TODO:REVISAR Y COLOCAR UN MIDDLEWARE
        return;
      }
    }, 1000);
  };

}
