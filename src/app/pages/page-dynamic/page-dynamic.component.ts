import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-dynamic',
  templateUrl: './page-dynamic.component.html',
  styleUrls: ['./page-dynamic.component.scss']
})
export class PageDynamicComponent implements OnInit {
  public id: string;

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.router.snapshot.paramMap.get('id');
  }

}
