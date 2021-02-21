import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import Typewriter from 't-writer.js';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  @ViewChild('asTitle') asTitle: ElementRef;
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

  constructor() {
  }

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.initEffect();
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
      .start();

  };


}

class LinkModel {
  link: string;
  icon: string;
}
