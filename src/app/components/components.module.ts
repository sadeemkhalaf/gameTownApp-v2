import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserDataCardComponent } from './user-data-card/user-data-card.component';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AppBackComponent } from './app-back/app-back.component';
import { ShopItemDataComponent } from './shop-item-data/shop-item-data.component';
import { NewDeviceActivityComponent } from './new-device-activity/new-device-activity.component';
import { ActivityCardComponent } from './activity-card/activity-card.component';
import { LogCardComponent } from './log-card/log-card.component';
import { FilterPipe } from '../filter.pipe';

const components = [
  UserDataCardComponent,
  AppBackComponent,
  ShopItemDataComponent,
  NewDeviceActivityComponent,
  ActivityCardComponent,
  LogCardComponent
];

@NgModule({
  declarations: [
    components, FilterPipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    components, FilterPipe
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA ],
  entryComponents: [
    components
  ]
})
export class ComponentsModule { }
