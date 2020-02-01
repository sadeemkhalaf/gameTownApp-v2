import { Component, OnInit } from '@angular/core';
import { ShopItem, OrderItem, CurrentActivity, TimerType } from 'src/app/models/UserData';
import { ShopItemsService } from 'src/app/main/services/shop-items.service';
import { ActivityService } from 'src/app/main/services/activity.service';
import { map } from 'rxjs/operators';
import { AppHelperService } from 'src/app/main/services/app-helper.service';
import { ModalController } from '@ionic/angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';

@Component({
  selector: 'app-new-device-activity',
  templateUrl: './new-device-activity.component.html',
  styleUrls: ['./new-device-activity.component.scss'],
})
export class NewDeviceActivityComponent implements OnInit {

  public currentActivity: CurrentActivity;
  public shopItemsList: ShopItem[] = [];
  public ordersList: OrderItem[] = [];
  public order: ShopItem;
  public qty = 0;
  public deviceName: string;
  public pairCount: number;
  private itemName = '';
  private timerType: string;
  private hoursSet: number;
  private minutesSet: number;

  constructor( private _shopService: ShopItemsService,
               private _activityService: ActivityService,
               private _helper: AppHelperService,
               public modalController: ModalController,
               private _localNotifications: LocalNotifications) { }

  ngOnInit() {
    this.deviceName = '';
    this.pairCount = 0;
    this._shopService.getItems().pipe(map(data => {
      data.map(items => {
        const item = items.payload.doc.data() as unknown as ShopItem;
        this.shopItemsList.push(item);
      });
    })).subscribe();
  }

  removeOrderFromCart(item: OrderItem) {
    if (!!this.ordersList && this.ordersList.length > 0) {
      this.ordersList = this.ordersList.filter((value) => value.itemId !== item.itemId);
    }
  }
  pushOrderToCart() {
    const order: ShopItem = this.shopItemsList.find(items =>  this.itemName.includes(items.description));
    this.qty = this.qty > 0 ? this.qty : 1;
    if (!!order) {
      // check if existed
      const item: OrderItem = this.ordersList.find(items =>  order.itemId === items.itemId);
      if (!!item) {
        this.ordersList = this.ordersList.filter(items => item.itemId !== items.itemId);
        item.qty += this.qty;
        this.ordersList.push(item);
      } else {
        this.ordersList.push({description: order.description, itemId: order.itemId
                              , qty: this.qty > 0 ? this.qty : 1 , unitPrice: order.price} as OrderItem);
      }
    }
    }

  onChange( event: any ) {
   this.itemName = event.detail.value.split('JD')[0];
  }

  removeFromList(itemInCart: OrderItem) {
    this.ordersList = this.ordersList.filter(items =>  items.itemId !== itemInCart.itemId);
  }

  dismiss() {
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      dismissed: true
    });
  }

  pushToCurrentActivities() {
    this._helper.presentLoading();
    const end = new Date(new Date().getTime() + (1000 * 3600 * this.hoursSet + 1000 * 60 * this.minutesSet));
    if (this.timerType.toLocaleLowerCase() === TimerType.DOWN) {
     // set alarm
     this._localNotifications.schedule({
       text: `${this.deviceName} time's up!`,
       trigger: {at: end},
       led: 'FF0000',
       sound: null});
    }
    this._activityService.addNewActivity({deviceNo: this.deviceName, pairsCount: this.pairCount,
                                          orders: this.ordersList, startTime: new Date().getTime()
                                          , timerType: this.timerType
                                          , hoursSet: !!this.hoursSet ? this.hoursSet : 0
                                          , minutesSet: !!this.minutesSet ? this.minutesSet : 0
                                          , secondsSet: 1, endTime: end.getTime()} as CurrentActivity)
                                          .then(() => {
                                            this.dismiss();
                                            this._helper.loadingController.dismiss();
                                          });

  }

}
