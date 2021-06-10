import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild
} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import Typewriter from 't-writer.js';
import {GraphComponent} from '@swimlane/ngx-graph';
import {Subject} from 'rxjs';
import {YoutubeService} from '../../services/youtube.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-path-route',
  templateUrl: './path-route.component.html',
  styleUrls: ['./path-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathRouteComponent implements OnInit, AfterViewInit {
  @ViewChild(GraphComponent) graphEl: GraphComponent;
  wrapperResize = {w: 0, h: 0, flag: false};
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('asTitle') asTitle: ElementRef;
  @ViewChild('asDescription') asDescription: ElementRef;
  update$: Subject<boolean> = new Subject();
  pathText: string;
  pathTag: any;
  idCourse: string;
  links: Array<any> = [];
  nodeLink: Array<any> = [];

  constructor(@Inject(PLATFORM_ID) private platformId, private cdr: ChangeDetectorRef,
              private youtubeService: YoutubeService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.loadCourse(this.idCourse);
  }

  ngAfterViewInit(): void {
    this.checkDimensions();
  }

  onNodeClick($event: MouseEvent): void {

    // this.panOffsetX = this.graphEl.panOffsetX + 250;
  }

  getTitle(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    // console.log(value);
    const myRegexp = /(PATH:)"(.*?)"/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    lineRaw = lineRaw.split('****').shift();
    return lineRaw;
  } //PATH_LIST

  getTag(value: string): string {
    value = value.replace(/(\r\n|\n|\r)/gm, '****');
    // console.log(value);
    const myRegexp = /(PATH_LIST:)"(.*?)"/gm;
    const match = myRegexp.exec(value) || [];
    const line = match.pop() || '';
    let lineRaw = line.replace(':', '');
    console.log(lineRaw);
    lineRaw = lineRaw.split('****').shift();
    lineRaw = lineRaw.split(',');
    return lineRaw;
  } //

  loadCourse(id): void {

    this.youtubeService.getDetailPlayList(id).subscribe((res: any) => {
      let counterNode = 0;
      const {items} = res;
      const {snippet} = items.shift();
      this.pathText = this.getTitle(snippet.description);
      this.pathTag = this.getTag(snippet.description) || [];

      this.nodeLink = this.pathTag.map((a, i) => {
        counterNode++;
        if (counterNode === this.pathTag.length) {
          this.updateChart();
        }
        return {
          id: `src_${i}`,
          label: `${i}`,
          image: `part_${counterNode}.png`
        };
      }).concat({
        id: `src_${counterNode}`,
        label: `${counterNode}`,
        image: `part_${counterNode + 1}.png`
      });

      this.links = this.pathTag.map((a, i) => {
        return {
          id: `id_${i}`,
          source: `src_${i}`, //src_0
          target: `src_${i + 1}`,
          label: a.toUpperCase()
        };
      });

      // this.nodeLink

      setTimeout(() => this.updateChart(), 1000);

      this.initEffect();
    });
  }

  checkDimensions(): void {
    if (isPlatformBrowser(this.platformId)) {
      const win = this.wrapper.nativeElement;
      // console.log(win);
      // console.log({w: win.innerWidth, h: win.innerHeight});
      this.wrapperResize = {w: win.offsetWidth, h: win.offsetHeight, flag: true};
      setTimeout(() => this.cdr.markForCheck(), 0);
      // console.log(this.pathText);


    }

  }

  initEffect = () => {
    const target = this.asTitle.nativeElement;
    const writer = new Typewriter(target, {
      loop: true,
      typeSpeed: 60,
      typeColor: 'white'
    });

    writer
      .changeCursorColor('white')
      // .type('Ruta de aprendizaje <span>ANGULAR</span>')
      .type(`Ruta de aprendizaje <span>${this.pathText}</span>`)
      .rest(50000)
      .start();

  };


  updateChart(): void {
    this.update$.next(true);
  }

  activate($event): void {
    // this.graphEl.panOffsetY = 5000;
    // // this.graphEl.panOffsetY = 100
    // console.log(this.graphEl.panOffsetY);
    // this.updateChart()
    console.log($event);
  }
}
