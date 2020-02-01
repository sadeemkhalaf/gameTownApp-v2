import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { UserData, UserRole } from 'src/app/models/UserData';
import { Router } from '@angular/router';
import { take, debounceTime } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.page.html',
  styleUrls: ['./account-settings.page.scss'],
})
export class AccountSettingsPage implements OnInit, OnDestroy {

  public user: firebase.User;
  private _subscription = new Subscription();

  constructor(private _authService: AuthenticationService
            , private _router: Router) { }

  ngOnInit() {
    this._subscription = this._authService.currentUser.pipe(debounceTime(150))
    .subscribe((user) => this.user = user);
  }

  navigateTo(path: string) {
    this._router.navigateByUrl(path);
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
