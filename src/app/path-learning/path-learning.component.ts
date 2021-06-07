import {
  AfterViewInit,
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
import {PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {DeviceDetectorService} from 'ngx-device-detector';
import {AverageTimePipe} from '../average-time.pipe';
import * as moment from 'moment';

@Component({
  selector: 'app-path-learning',
  templateUrl: './path-learning.component.html',
  styleUrls: ['./path-learning.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathLearningComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('asLoadingHorizontal') asLoadingHorizontal: ElementRef;
  @ViewChild('asOverBlock') asOverBlock: ElementRef;
  @ViewChild('ps') ps: PerfectScrollbarDirective;
  @ViewChild('asScroll') asScroll: ElementRef;

  @Input() asData: any;
  config: any;
  indexVideo: Array<number> = [];
  listVideos: Array<any> = [];
  playListId: string;
  listObserver$: Array<Subscription> = [];
  currentUser: UserModel;
  viewActive: Array<any> = [];
  viewInActive: Array<any> = [];
  averageTotal: number;

  constructor(@Inject(PLATFORM_ID) private platformId, private route: ActivatedRoute, private youtubeService: YoutubeService,
              private renderer2: Renderer2, public oAuthService: OAuthLmService, private router: Router,
              private deviceService: DeviceDetectorService, private averageTimePipe: AverageTimePipe) {


  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId) && (!this.deviceService.isDesktop())) {

      this.ps.ngOnDestroy();
      this.renderer2.setStyle(this.asScroll.nativeElement, 'height', '100%');
      // this.renderer2.removeClass(el, 'ps--active-y');
      // this.renderer2.removeClass(el, 'ps');
    }

  }

  ngOnInit(): void {
    this.indexVideo = [0];
    this.playListId = this.route.snapshot.paramMap.get('id');
    this.loadCourse(this.playListId);
    this.checkCbTest();
    this.listObserver$ = [];

  }

  ngOnChanges(changes: SimpleChanges): void {
    const {firstChange, currentValue} = changes.asData;
    if (!firstChange) {
      this.getBrand(currentValue);
    }


  }

  checkCbTest(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const user = this.route.snapshot.paramMap.get('user');
    const test = this.route.snapshot.paramMap.get('test');
    this.oAuthService.cbTest = {id, test, user};
    console.log(this.oAuthService.cbTest);
  }

  loadCourse(id): void {
    this.youtubeService.loadPlayList(id).subscribe((res: any) => {
      // this.averageTimePipe.transform()
      let allMinString = res.map((a) => {
        const tmp = this.averageTimePipe.transform(a?.snippet?.description);
        return typeof tmp === 'string' ? tmp : null;
      });

      allMinString = allMinString.filter(a => (a));
      const sum = allMinString.reduce((acc, time) => acc.add(moment.duration(time)), moment.duration());
      this.averageTotal = sum.asHours() || 0;
      this.listVideos = res;
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
        return;
      }
      if (percent > 70 && !this.indexVideo.includes(3)) {
        this.indexVideo = [...new Set(this.indexVideo.concat([3]))];
        return;
      }
      if (percent > 90) {
        this.indexVideo = [...new Set(this.indexVideo.concat([3, 4, 5, 6]))];
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


  public onIntersection({target, visible}: { target: Element; visible: boolean }): void {
    const {value} = target.attributes['data-test'];
    this.viewInActive = [...new Set(this.viewInActive.concat(value))];
    if (visible) {
      // this.viewInActive = this.viewInActive.filter(a => a !== value);
      this.viewActive = [...this.viewActive, ...[value]];
      // console.log(this.viewActive);
      // this.viewActive.push(value);
    }
  }
}
