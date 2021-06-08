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

  constructor(@Inject(PLATFORM_ID) private platformId, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.checkDimensions();
  }

  onNodeClick($event: MouseEvent): void {

    // this.panOffsetX = this.graphEl.panOffsetX + 250;
  }

  checkDimensions(): void {
    if (isPlatformBrowser(this.platformId)) {
      const win = this.wrapper.nativeElement;
      console.log(win);
      console.log({w: win.innerWidth, h: win.innerHeight});
      this.wrapperResize = {w: win.offsetWidth, h: win.offsetHeight, flag: true};
      setTimeout(() => this.cdr.markForCheck(), 0);
      // console.log(intViewportWidth);
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
      .type('Ruta de aprendizaje')
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
