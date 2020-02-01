import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MenuPage } from './menu.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { AuthGuardService } from '../services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: MenuPage,
    children: [
      { path: 'dashboard', loadChildren: () => import('../dashboard/dashboard.module' ).then( m => m.DashboardPageModule)
        , canActivate: [AuthGuardService]},
      { path: 'account-settings', loadChildren: () => import('../account-settings/account-settings.module')
      .then(m => m.AccountSettingsPageModule ) },
      { path: 'accounts-management', loadChildren: () => import('../account-management/account-management.module')
      .then(m => m.AccountManagementPageModule )},
      { path: 'shop-management', loadChildren: () => import('../pages/shop-items/shop-items.module')
      .then(m => m.ShopItemsPageModule)}
   ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MenuPage]
})
export class MenuPageModule {
}
