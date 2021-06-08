import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js';
import {OAuthLmService} from '../oauth-lm.service';
import {ActivatedRoute} from '@angular/router';
import {environment} from '../../environments/environment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiRestService} from '../api-rest.service';
import {log} from 'util';

@Component({
  selector: 'app-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit, AfterViewInit {
  @ViewChild('asCTAFree') asCTAFree: ElementRef;
  idCourse: any;
  urlLoginFb: string;
  urlLoginInstagram: string;
  urlLoginGoogle: string;
  formEmail: FormGroup = new FormGroup({});


  constructor(public oAuthService: OAuthLmService, private route: ActivatedRoute, private fb: FormBuilder,
              private apiRestService: ApiRestService) {
  }

  ngOnInit(): void {
    this.formEmail = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });

    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.urlLoginFb = `${environment.api}/login-facebook?course=${this.idCourse}`;
    this.urlLoginGoogle = `${environment.api}/login-google?course=${this.idCourse}`;
    this.urlLoginInstagram = `${environment.api}/login-instagram?course=${this.idCourse}`;
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


  getEmail(): void {

    this.oAuthService.sessionEmail = true;
  }

  skip(): void {
    const {email} = this.formEmail.value;
    this.apiRestService.postEmail(email)
      .subscribe((res: any) => {
        this.oAuthService.setToken(res.token);
       this.oAuthService.checkSession = true;
      });

  }
}
