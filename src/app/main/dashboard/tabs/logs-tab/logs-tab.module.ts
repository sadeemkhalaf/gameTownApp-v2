import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LogsTabPage } from './logs-tab.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { OrderModule } from 'ngx-order-pipe';
const routes: Routes = [
  {
    path: '',
    component: LogsTabPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderModule,
    ComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LogsTabPage]
})
export class LogsTabPageModule {}
