import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('../app/home/home.module').then(m => m.HomePageModule) },
  { path: 'menu', loadChildren: () => import('./main/menu/menu.module').then(m => m.MenuPageModule) },
  { path: 'login', loadChildren: './main/user/login/login.module#LoginPageModule' },
  { path: 'account-management', loadChildren: () => import ('./main/account-management/account-management.module')
  .then(m => m.AccountManagementPageModule)},
  {
    path: 'edit-activity/:id',
    loadChildren: () => import('./../app/main/pages/edit-activity/edit-activity.module')
    .then(m => m.EditActivityPageModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
