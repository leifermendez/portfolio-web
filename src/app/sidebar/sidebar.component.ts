import {AfterViewInit, Component, ElementRef, Inject, Input, OnDestroy, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js';
import {GithubService} from '../github.service';
import {isPlatformBrowser} from '@angular/common';
import {TestEmbedService} from '../test-embed.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('asTitle') asTitle: ElementRef;
  @ViewChild('asTemplate1') asTemplate1: ElementRef;
  @Input() asData: DataIn = {
    title: 'Soy desarrollador Web',
    description: `Me apasionan las tecnologías web, también creo contenido en
    <a href="https://youtube.com/leifermendez" target="_blank">Youtube</a> me encantan los proyectos
    retadores y aportar conocimiento a la comunidad.`,
    slug: 'Hola mi nombre es'
  };

  public isBrowser = false;
  links: Array<LinkModel> = [
    {
      link: 'http://youtube.com/leifermendez',
      icon: '<i class="uil uil-youtube"></i>'
    },
    {
      link: 'https://github.com/leifermendez',
      icon: '<i class="uil uil-github-alt"></i>'
    },
    {
      link: 'mailto:leifer33@gmail.com',
      icon: '<i class="uil uil-envelope"></i>'
    },
  ];
  dataProfile: any;
  listObserver$: Array<Subscription> = [];

  constructor(private gitHubService: GithubService, @Inject(PLATFORM_ID) private platformId,
              private testEmbedService: TestEmbedService,
              private renderer2: Renderer2) {
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach(a => a.unsubscribe());
  }

  ngOnInit(): void {
    // this.gitHubService.getRepo()
    //   .subscribe(res => this.dataProfile = res);

    if (isPlatformBrowser(this.platformId)) {

      const observer1$ = this.testEmbedService.cbLayout.subscribe(res => {
        const template1 = this.asTemplate1.nativeElement;
        this.listObserver$ = [observer1$];
        this.renderer2.addClass(template1, 'moveTemplate1');

      });

      this.isBrowser = true;
    }
  }


  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initEffect();
    }

  }

  initEffect = () => {
    const target = this.asTitle.nativeElement;
    const writer = new Typewriter(target, {
      loop: true,
      typeColor: 'white'
    });

    writer
      .changeCursorColor('white')
      .type('Leifer Mendez')
      .rest(50000)
      .clear()
      .type('¿Ya viste mis videos?')
      .rest(2000)
      .start();

  };


}

class DataIn {
  title: string;
  description: string;
  slug: string;
}

class LinkModel {
  link: string;
  icon: string;
}
