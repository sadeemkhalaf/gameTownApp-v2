import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PriceListPageRoutingModule } from './price-list-routing.module';

import { PriceListPage } from './price-list.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComponentsModule,
    PriceListPageRoutingModule
  ],
  declarations: [PriceListPage]
})
export class PriceListPageModule {}
