import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  public pages = [{
    name: 'Dashboard',
    link: 'menu/dashboard',
    icon: 'home'
  }, {
    name: 'Account Settings',
    link: 'menu/account-settings',
    icon: 'settings'
  }, {
    name: 'Logout',
    link: '/login',
    icon: 'log-out'
  }
  ];

  constructor(private _router: Router,
              private _menu: MenuController,
              private _authService: AuthenticationService) { }

  ngOnInit() {
  }

  navigateTo(path: string) {
    this._router.navigateByUrl(path);
    this._menu.toggle();
  }

  logout(pageName: string) {
    if (pageName.toLocaleLowerCase() === 'logout') {
      this._authService.logout();
    }
  }
}
