import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {GithubService} from '../github.service';
import {YoutubeService} from '../youtube.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit {
  @ViewChild('asWorks') asWorks: ElementRef;
  repos: any;
  youtube: any;
  config: any;

  constructor(private gitHubService: GithubService, private youtubeService: YoutubeService, @Inject(PLATFORM_ID) private platformId) {
  }

  ngOnInit(): void { //
    this.loadRepos();
    this.loadYt();
  }

  loadRepos = () => {
    this.gitHubService.loadRepos().subscribe(res => {
      this.repos = res;
    });
  };

  loadYt = () => {
    this.youtubeService.loadCourses().subscribe(res => {
      // console.log(res);
      this.youtube = res;
    });
  };

  listenerY($event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const {scrollTop} = $event.target;
      // console.log(scrollTop);
      if (scrollTop > 15) {
        window.scroll(0, 800);
      }
    }
  }
}
