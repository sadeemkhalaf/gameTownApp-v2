import { Injectable } from '@angular/core';
import { Platform, LoadingController, ToastController } from '@ionic/angular';
import * as uuid from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class AppHelperService {

  private _loaderToShow: any;
  constructor(private _platform: Platform,
              public loadingController: LoadingController,
              private _toastController: ToastController) {}

  async presentLoading() {
    this._loaderToShow = await this.loadingController.create({
        message: ''
        });
    await this._loaderToShow.present();
  }

  async presentToast(msg: string) {
    const toast = await this._toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }


  public generateRandomId() {
    return uuid.v5();
  }

  public get isRealDevice() {
    return this._platform.is('cordova');
  }

  }
