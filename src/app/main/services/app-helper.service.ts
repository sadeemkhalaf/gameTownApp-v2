import { Injectable } from '@angular/core';
import { Platform, LoadingController } from '@ionic/angular';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  private _loaderToShow: any;
  constructor(private _platform: Platform,
              public loadingController: LoadingController) {}

  async presentLoading() {
    this._loaderToShow = await this.loadingController.create({
        message: ''
        });
    await this._loaderToShow.present();
  }

  public generateRandomId() {
    return uuid.v5();
  }

  public get isRealDevice() {
    return this._platform.is('cordova');
  }

  }
