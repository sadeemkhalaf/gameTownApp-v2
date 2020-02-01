import { Injectable } from '@angular/core';
import { Storage } from '@ionic/Storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private _storage: Storage) { }

  public async addUser(key: string, value: any) {
    const v = JSON.stringify(value);
    await this._storage.set(key, v);
  }

  public getUser(key: string) {
    return this._storage.get(key);
  }

  public async removeUser(key: string) {
    await this._storage.remove(key);
  }

}
