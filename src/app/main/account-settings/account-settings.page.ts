import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData } from 'src/app/models/UserData';
import { Router } from '@angular/router';
import { take, debounceTime, mergeMap, map, switchMap } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit, OnDestroy {

  public user: firebase.User;
  public userData: UserData;
  private _subscription = new Subscription();

  constructor(private _authService: AuthenticationService
            , private _router: Router) { }

  ngOnInit() {
    this._subscription = this._authService.currentUser.pipe(debounceTime(150),
    map((user) => this.user = user),
    switchMap(() => this._authService.getAllUsers().snapshotChanges()),
    take(1))
    .subscribe((user) => {
      user.map((u) => {
        const data = u.payload.doc.data() as unknown as UserData;
        if (data.email === this.user.email) {
          this.userData = data;
        }
      });
    });
  }

  navigateTo(path: string) {
    this._router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
