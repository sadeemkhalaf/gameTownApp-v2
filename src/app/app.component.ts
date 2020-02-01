import { Component, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { debounceTime } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthenticationService } from './main/services/authentication.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnDestroy {
  private _subscriptions: Subscription = new Subscription();

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private _router: Router,
    private _authService: AuthenticationService
  ) {
    this.initializeApp();

    this._authService.currentUser.pipe(debounceTime(150)).subscribe((user) => {
      if (!!user) {
        this._router.navigateByUrl('/menu/dashboard/activities', {replaceUrl: true});
      } else {
        this._router.navigateByUrl('/login', {replaceUrl: true});
      }
    });
  }

  ngOnDestroy(): void {
   this._subscriptions.unsubscribe();
  }
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

}
