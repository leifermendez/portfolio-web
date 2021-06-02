import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
  Input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {ActivatedRoute, Router} from '@angular/router';
import {YoutubeService} from '../youtube.service';
import {OAuthLmService, UserModel} from '../oauth-lm.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-path-learning',
  templateUrl: './path-learning.component.html',
  styleUrls: ['./path-learning.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathLearningComponent implements OnInit, OnChanges {
  @ViewChild('asLoadingHorizontal') asLoadingHorizontal: ElementRef;
  @ViewChild('asOverBlock') asOverBlock: ElementRef;
  @Input() asData: any;
  config: any;
  indexVideo: Array<number> = [];
  listVideos: Array<any> = [];
  playListId: string;
  listObserver$: Array<Subscription> = [];
  currentUser: UserModel;

  constructor(@Inject(PLATFORM_ID) private platformId, private route: ActivatedRoute, private youtubeService: YoutubeService,
              private renderer2: Renderer2, public oAuthService: OAuthLmService, private router: Router) {


  }

  ngOnInit(): void {
    this.indexVideo = [0];
    this.playListId = this.route.snapshot.paramMap.get('id');
    this.loadCourse(this.playListId);
    this.checkCbTest();

    const observer$1 = this.oAuthService.getCurrentUser().subscribe(res => {
      console.log('---->', res);
      this.currentUser = res;
    }, error => {

    });

    this.listObserver$ = [observer$1];

  }

  ngOnChanges(changes: SimpleChanges): void {
    const {firstChange, currentValue} = changes.asData;
    if (!firstChange) {
      this.getBrand(currentValue);
      console.log('*******************', currentValue);
    }


  }

  checkCbTest(): void {
    console.log(this.route.snapshot);
    const id = this.route.snapshot.paramMap.get('id');
    const user = this.route.snapshot.paramMap.get('user');
    const test = this.route.snapshot.paramMap.get('test');
    this.oAuthService.cbTest = {id, test, user};
    console.log(this.oAuthService.cbTest);
  }

  loadCourse(id): void {
    this.youtubeService.loadPlayList(id).subscribe(res => {
      this.listVideos = res;
      console.log(res);
    });
  }

  getBrand(data): any {
    // console.log(data);
    if (isPlatformBrowser(this.platformId)) {
      document.documentElement.style.setProperty('--course-brand', data.color);
      document.documentElement.style.setProperty('--course-logo', `url("${data.logo}")`);
    }
  }

  listenerY($event: any): void {
    if (isPlatformBrowser(this.platformId)) {
      const {scrollTop, innerHeight, offsetHeight, scrollHeight} = $event.target;
      const total = scrollHeight;
      const currentPercentage = (offsetHeight + scrollTop);
      const percent = (currentPercentage * 100) / total;
      // console.log(percent);

      const el = this.asLoadingHorizontal.nativeElement;
      // console.log(percent - 100);
      this.renderer2.setStyle(el, 'width', `${percent}%`);
//TODO: REV
      if (this.asOverBlock) {
        const elOver = this.asOverBlock.nativeElement;
        this.renderer2.setStyle(elOver, 'display', (percent > 3) ? `block` : 'none');
      }

      if (percent < 40) {
        this.indexVideo = [...new Set(this.indexVideo.concat([0]))];
        return;
      }
      if (percent > 45 && !this.indexVideo.includes(1)) {
        this.indexVideo = [...new Set(this.indexVideo.concat([1]))];
        return;
      }
      if (percent > 60 && !this.indexVideo.includes(2)) {
        this.indexVideo = [...new Set(this.indexVideo.concat([2]))];
        console.log(this.indexVideo);
        return;
      }
      if (percent > 70 && !this.indexVideo.includes(3)) {
        this.indexVideo = [...new Set(this.indexVideo.concat([3]))];
        console.log(this.indexVideo);
        return;
      }
      if (percent > 90) {
        this.indexVideo = [...new Set(this.indexVideo.concat([3, 4, 5, 6]))];
        console.log(this.indexVideo);
        return;
      }

      // 100 solo 1 500
    }
  }


  setPlayer(videoId: string): void {
    this.router.navigate(
      [],
      {
        relativeTo: this.route,
        queryParams: {video: videoId},
        queryParamsHandling: 'merge'
      }
    );
  }
}
