import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js';
import {OAuthLmService} from '../oauth-lm.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {
  @ViewChild('asCTAFree') asCTAFree: ElementRef;
  idCourse: any;
  urlLoginFb: string;

  constructor(private oAuthService: OAuthLmService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.urlLoginFb = `${environment.api}/login-facebook?course=${this.idCourse}`;
  }

  initEffect = () => {
    const target = this.asCTAFree.nativeElement;
    const writer = new Typewriter(target, {
      loop: true,
      typeColor: '#1a1a1a'
    });

    writer
      .type('¿Gratis? 🤔')
      .rest(2500)
      .clear()
      .type('¡SI! 😊')
      .rest(2000)
      .start();

  };

  ngAfterViewInit(): void {
    this.initEffect();
  }


  skip(): void {
    this.oAuthService.checkSession = true;
  }
}
