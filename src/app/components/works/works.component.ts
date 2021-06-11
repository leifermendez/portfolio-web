import {AfterViewInit, Component, ElementRef, Inject, OnInit, PLATFORM_ID, Renderer2, ViewChild} from '@angular/core';
import {GithubService} from '../../services/github.service';
import {YoutubeService} from '../../services/youtube.service';
import {isPlatformBrowser} from '@angular/common';
import {Router} from '@angular/router';
import {PerfectScrollbarComponent, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {ApiRestService} from '../../services/api-rest.service';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrls: ['./works.component.scss']
})
export class WorksComponent implements OnInit, AfterViewInit {
  @ViewChild('asWorks') asWorks: ElementRef;
  @ViewChild('ps') ps: PerfectScrollbarDirective;
  @ViewChild('asScroll') asScroll: ElementRef;
  repos: any;
  youtube: any;
  config: any;
  tags: Array<string> = [];
  showTagName: string | boolean = false;
  members: Array<MemberModel> = [];
  particles: Array<any> = [...Array(20).keys()];

  constructor(private gitHubService: GithubService, private youtubeService: YoutubeService, @Inject(PLATFORM_ID) private platformId,
              private router: Router, private renderer2: Renderer2, private deviceService: DeviceDetectorService,
              private apiRestService: ApiRestService) {
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && (!this.deviceService.isDesktop())) {

      this.ps.ngOnDestroy();
      this.renderer2.setStyle(this.asScroll.nativeElement, 'height', '100%');
      // this.renderer2.removeClass(el, 'ps--active-y');
      // this.renderer2.removeClass(el, 'ps');
    }

  }

  ngOnInit(): void { //
    this.loadRepos();
    this.loadYt();
    this.loadMembers();
  }

  loadMembers = () => {
    this.apiRestService.getMembers().subscribe(({data}: any) => this.members = data);
  };

  loadRepos = () => {
    this.gitHubService.loadRepos().subscribe(res => {
      this.repos = res;
    });
  };

  loadYt = () => {
    this.youtubeService.loadCourses().subscribe(res => {
      this.tags = res.map((a) => a.tag).filter((i) => (i));
      this.youtube = res;
      console.log(res);
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

  showFilter(tag: string | boolean): void {
    this.showTagName = tag;
  }
}

interface MemberModel {
  avatar: string;
  name: string;
  topic: string;
  country: string;

}
