import { Component, OnInit, Input } from '@angular/core';
import { CardState, ShopItem } from './../../models/UserData';
import { ShopItemsService } from 'src/app/main/services/shop-items.service';
@Component({
  selector: 'app-shop-item-data',
  templateUrl: './shop-item-data.component.html',
  styleUrls: ['./shop-item-data.component.scss'],
})
export class ShopItemDataComponent implements OnInit {
  public currentState: CardState;
  @Input() item: { itemData: ShopItem, cardState: CardState};
  constructor(private _shopService: ShopItemsService) { }

  ngOnInit() {
    this.currentState = this.item.cardState;
  }

  changeState(cancel?: boolean) {
    this.currentState = (this.currentState === CardState.EDIT) || (this.currentState === CardState.NEW)
    ? CardState.VIEW : CardState.EDIT;
    if (cancel) {
      this.item.cardState = CardState.DELETED;
      this.currentState = CardState.DELETED;
    }
  }

  addItem() {
    this._shopService.addItem(this.item.itemData);
    this.changeState();
  }

  updateItem() {
    this._shopService.updateItem(this.item.itemData);
  }

  deleteItem() {
    this._shopService.deleteItem(this.item.itemData.itemId);
  }
}
