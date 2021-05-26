import {Component, Inject, PLATFORM_ID} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {ApiRestService} from './api-rest.service';
import {isPlatformBrowser} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'portafolio-web';
  public readonly VAPID_PUBLIC_KEY = 'BGmZ039okFid9eDMauKTunFpaqytiISZ_niGKXXKZpkcj5uWXNwcdfO2CVxEjQVw6Ud0gNFHM1BVsWXFFdwTAQA';

  constructor(private swPush: SwPush, private apiRest: ApiRestService, @Inject(PLATFORM_ID) private platformId) {
    this.subscribeToNotifications();
    this.getTheme();
  }

  subscribeToNotifications(): any {
    if (isPlatformBrowser(this.platformId)) {
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

  getTheme(): any {
    if (isPlatformBrowser(this.platformId)) {
      const d = new Date();
      const n = d.getHours();
      console.log(n);
      // let switchMode = n > 8 && n < 20;
      const switchMode = true;
      // switchMode = !switchMode
      document.documentElement.style.setProperty('--color-1', switchMode ? 'white' : '#00296b');
      document.documentElement.style.setProperty('--color-2', switchMode ? '#3f51b5' : '#38ffec');
      document.documentElement.style.setProperty('--color-3', switchMode ? '#1a1a1a' : 'white');
      document.documentElement.style.setProperty('--opacity-1', switchMode ? '#ffffff85' : '#00296b8c');
      return (n > 8 && n < 20);
    }
  }

}
