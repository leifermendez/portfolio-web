import {Component, Inject, OnInit, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  links: any = [
    {
      src: 'https://www.youtube.com/leifermendez',
      name: 'Youtube'
    },
    {
      src: 'https://github.com/leifermendez',
      name: 'Github'
    },
    {
      src: 'mailto:leifer33@gmail.com',
      name: 'Contacto'
    }
  ];

  constructor() {
  }

  ngOnInit(): void {

  }

}


