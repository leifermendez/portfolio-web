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

@Component({
  selector: 'app-path-route',
  templateUrl: './path-route.component.html',
  styleUrls: ['./path-route.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PathRouteComponent implements OnInit, AfterViewInit {
  wrapperResize = {w: 0, h: 0, flag: false};
  @ViewChild('wrapper') wrapper: ElementRef;
  @ViewChild('asTitle') asTitle: ElementRef;
  @ViewChild('asDescription') asDescription: ElementRef;

  constructor(@Inject(PLATFORM_ID) private platformId, private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.checkDimensions();
  }

  onNodeClick($event: MouseEvent): void {

  }

  checkDimensions(): void {
    if (isPlatformBrowser(this.platformId)) {
      const win = this.wrapper.nativeElement;
      console.log(win);
      console.log({w: win.innerWidth, h: win.innerHeight});
      this.wrapperResize = {w: win.offsetWidth, h: win.offsetHeight, flag: true};
      setTimeout(() => this.cdr.markForCheck(), 0);
      // console.log(intViewportWidth);
      this.initEffect()
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
