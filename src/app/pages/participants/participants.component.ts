import {Component, OnInit} from '@angular/core';
import {YoutubeService} from '../../services/youtube.service';
import {ActivatedRoute} from '@angular/router';
import {ApiRestService} from '../../services/api-rest.service';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.scss']
})
export class ParticipantsComponent implements OnInit {
  users: Array<any> = [];
  idCourse: string;
  title: string;

  constructor(private youtubeService: YoutubeService, private route: ActivatedRoute, private apiRestService: ApiRestService) {
  }

  ngOnInit(): void {

    this.idCourse = this.route.snapshot.paramMap.get('id');
    this.loadData(this.idCourse).then(({title, color}) => {
      // console.log(title);
      this.title = title;
    });

    this.loadParticipants();

  }

  loadParticipants(): void {
    this.apiRestService.getParticipants(this.idCourse)
      .subscribe(({data}: any) => {
        this.users = data;
      });
  }

  loadData(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.youtubeService.getDetailPlayList(id).subscribe((res: any) => {
        const {items} = res;
        const {snippet} = items.shift();
        const color = this.youtubeService.getBrandColor(snippet.description);
        const title = this.youtubeService.getTitle(snippet.description);
        const description = this.youtubeService.getDescription(snippet.description);
        resolve({color, title, description});
      }, () => {
        reject(false);
      });
    });

  }
}
