import {AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {delay, tap} from 'rxjs/operators';
import {DeviceDetectorService} from 'ngx-device-detector';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss']
})
export class VideoPlayerComponent implements OnInit, AfterViewInit {
  @ViewChild('asVideoSingle') asVideoSingle: ElementRef;
  videoDimensions: any;
  videoOptions: any;
  videoId: string;
  courseId: string;
  state = 0;
  resize = false;
  isDesktop = false;

  constructor(private element: ElementRef, private route: ActivatedRoute, private renderer2: Renderer2,
              private deviceDetectorService: DeviceDetectorService) {
    this.isDesktop = deviceDetectorService.isDesktop();
  }

  ngOnInit(): void {
    this.courseId = this.route.snapshot.paramMap.get('id');
    this.route.queryParams.pipe(
      tap(() => this.resetState()),
      delay(250)
    ).subscribe(({video}) => {
      if (video) {
        this.videoId = video;
        this.getDimensions();
        console.log('VIDEO', video);
      }

    });


    this.videoOptions = {
      suggestedQuality: 'highres',
      rel: 0,
      autohide: 1,
      showinfo: 0
    };
  }

  savePlayer($event: YT.Player): void {
    console.log('****', $event);

  }

  onStateChange($event: any): void {
    console.log($event.data);
    this.state = $event.data;
  }

  getDimensions(): any {
    if (this.asVideoSingle) {
      const {offsetHeight, offsetWidth} = this.asVideoSingle.nativeElement;
      console.log(offsetHeight, offsetWidth, this.resize);
      const percentage = 1;
      // this.resize = !this.resize;
      const w = `${offsetWidth * percentage}px`;
      const h = `${offsetHeight * percentage}px`;
      this.videoDimensions = {w, h};
      const elementWrapper = this.asVideoSingle.nativeElement;
      if ((offsetWidth > 50) && (offsetHeight > 50)) {

        this.renderer2.setStyle(elementWrapper, 'width', w);
        this.renderer2.setStyle(elementWrapper, 'height', h);
      }

      const ratio = offsetWidth / offsetHeight;
      const result = (Math.abs(ratio - 4 / 3) < Math.abs(ratio - 16 / 9)) ? '4:3' : '16:9';
      console.log(result);
    }

    // return result;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getDimensions();
    }, 0);
  }

  private resetState(): void {

    this.videoId = null;
    // this.videoDimensions = null;
    this.state = 0;
  }
}
