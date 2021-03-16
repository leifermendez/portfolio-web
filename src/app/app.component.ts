import {Component} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {ApiRestService} from './api-rest.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portafolio-web';
  public readonly VAPID_PUBLIC_KEY = 'BLsPtiDIHfvdJu_PbjezOcH48U3AJdzSXgMHiYkb7Z-gbyDvM_XA3ZkN_dQf0RgNef7c4LBfIwPMWMfdMEl5x60';

  constructor(private swPush: SwPush, private apiRest: ApiRestService) {
    this.subscribeToNotifications();
  }

  subscribeToNotifications(): any {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_PUBLIC_KEY
    }).then(sub => {
      const token = JSON.parse(JSON.stringify(sub));
      // console.log('*********** OJOOO ************', token);
      this.apiRest.saveToken(token).subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log('ERR', err);
      });

    }).catch(err => console.error('UPS :(', err));
  }

}
