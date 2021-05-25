import {Component, OnInit} from '@angular/core';
import {GithubService} from '../../github.service';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.scss']
})
export class AboutMeComponent implements OnInit {
  public text: string;

  constructor(private gitubService: GithubService, private title: Title) {
  }

  ngOnInit(): void {
    this.title.setTitle('Acerca de ');
    this.gitubService.loadAboutMe()
      .subscribe(({text}: any) => {
        this.text = text;
      });
  }


}
