import {Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {YoutubeService} from '../../services/youtube.service';
import {TemplateEmbed, TestEmbedService} from '../../services/test-embed.service';
import {Subscription} from 'rxjs';
import {OAuthLmService} from '../../services/oauth-lm.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit, OnDestroy {
  public modeVideo = true;
  public dataCourse: any = {};
  playListId: any;
  listObserver$: Array<Subscription> = [];

  constructor(private route: ActivatedRoute, private youtubeService: YoutubeService, private oAuthService: OAuthLmService) {
  }

  ngOnDestroy(): void {
    this.listObserver$.forEach(a => a.unsubscribe());
  }

  ngOnInit(): void {
    // const observer$1 = this.oAuthService.getCurrentUser().subscribe(res => {
    //   console.log('---->', res);
    // }, error => {
    //   this.oAuthService.currentUser = null;
    // });
    //
    // this.listObserver$ = [observer$1];

    this.route.queryParams.subscribe(({video}) => {
      this.modeVideo = (video);
    });

    // this.listObserver$ = [observer1$];
    // const {data} = this.route.snapshot;
    this.playListId = this.route.snapshot.paramMap.get('id');
    this.loadData(this.playListId).then((data) => {
      this.dataCourse = {
        title: data.title,
        description: data.description,
        slug: 'Curso Gratis',
        color: data.color,
        logo: data.logo
      };
    });

  }

  loadData(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.youtubeService.getDetailPlayList(id).subscribe((res: any) => {
        const {items} = res;
        const {snippet} = items.shift();
        const color = this.youtubeService.getBrandColor(snippet.description);
        const logo = this.youtubeService.getBrandLogo(snippet.description);
        const order = this.youtubeService.getOrderNumber(snippet.description);
        const title = this.youtubeService.getTitle(snippet.description);
        const description = this.youtubeService.getDescription(snippet.description);
        const requirement = this.youtubeService.getRequirement(snippet.description);
        // const requeriment = this.getDescription(snippet.description);
        resolve({color, logo, order, title, description, requirement});
      }, () => {
        reject(false);
      });
    });

  }





}

