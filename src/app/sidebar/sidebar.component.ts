import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js';
import {GithubService} from '../github.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('asTitle') asTitle: ElementRef;
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

  constructor(private gitHubService: GithubService, @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit(): void {
    // this.gitHubService.getRepo()
    //   .subscribe(res => this.dataProfile = res);

    if (isPlatformBrowser(this.platformId)) {
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

class LinkModel {
  link: string;
  icon: string;
}
