import {Component, ElementRef, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {GithubService} from '../github.service';
import {YoutubeService} from '../youtube.service';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';

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
  tags: Array<string> = [];


  constructor(private gitHubService: GithubService, private youtubeService: YoutubeService, @Inject(PLATFORM_ID) private platformId,
              private router: Router) {
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

      this.tags = res.map((a) => a.tag).filter((i) => (i));
      console.log(this.tags);
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

  goToCourse(item: any): void {
    this.router.navigate(['/', 'course', item.id], {state: {a: 1}});
    // ['/','course',item.id]
  }
}
