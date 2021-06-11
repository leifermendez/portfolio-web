import {Component, OnInit} from '@angular/core';
import {OAuthLmService} from '../../services/oauth-lm.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public oAuthService: OAuthLmService) {
  }

  ngOnInit(): void {
  }

  close(): void {
    this.oAuthService.terms = false;
  }

}
