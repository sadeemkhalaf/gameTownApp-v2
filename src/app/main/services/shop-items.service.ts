import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShopItem } from 'src/app/models/UserData';

@Injectable({
  providedIn: 'root'
})
export class ShopItemsService {

  static ITEM_KEY = 'items';
  constructor(private _firestore: AngularFirestore) { }

  // insert, update, delete, getOne, getAll
  public addItem(item: ShopItem) {
    const id: string = this._firestore.createId();
    item.itemId = id;
    return this._firestore.collection(ShopItemsService.ITEM_KEY).doc(id).set(item);
  }
  public updateItem(item: ShopItem) {
    return this._firestore.collection(ShopItemsService.ITEM_KEY).doc(item.itemId).set(item);
  }
  public deleteItem(id: string) {
    return this._firestore.collection(ShopItemsService.ITEM_KEY).doc(id).delete();
  }
  public getItems() {
    return this._firestore.collection(ShopItemsService.ITEM_KEY).snapshotChanges();
  }
  public getItem(id: string) {
    return this._firestore.collection(ShopItemsService.ITEM_KEY).doc(id).get();
  }
}
