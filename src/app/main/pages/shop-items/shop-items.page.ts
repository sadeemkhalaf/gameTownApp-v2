import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ShopItem, CardState } from 'src/app/models/UserData';
import { Subject } from 'rxjs';
import { ShopItemsService } from '../../services/shop-items.service';
import { map, takeWhile } from 'rxjs/operators';

@Component({
  selector: 'app-shop-items',
  templateUrl: './shop-items.page.html',
  styleUrls: ['./shop-items.page.scss'],
})
export class ShopItemsPage implements OnInit {
  public backPath = 'menu/account-settings';

  public shopList: { itemData: ShopItem, cardState: CardState}[] = [];

  private _shopListSubject: Subject<{ itemData: ShopItem, cardState: CardState}[]> =
  new Subject<{ itemData: ShopItem, cardState: CardState}[]>();
  private _alive = true;

  constructor(private _shopService: ShopItemsService) {
    this.getItems().subscribe();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.shopList = [];
  }

  addNewItem() {
    this.shopList.push({itemData: {} , cardState: CardState.NEW});
  }

  getItems() {
    return this._shopService.getItems().pipe(takeWhile(() => this._alive),
    map( user => {
      this.shopList = [];
      user.map(u => {
          const data = u.payload.doc.data() as unknown as ShopItem;
          const id = u.payload.doc.id;
          this.shopList.push({itemData: data, cardState: CardState.VIEW});
        });
      }));
    }
}
