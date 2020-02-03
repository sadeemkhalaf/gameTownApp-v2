import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrentActivity, OrderItem, ActivityLog, PriceCategory } from '../../models/UserData';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private ACTIVITY_KEY: string = 'activities';
  private ACTIVITY_LOG_KEY: string = 'activitiesLog';
  private PRICES_KEY: string = 'pricesList';

  constructor(private _firestore: AngularFirestore) {
  }

  getAllActivities(): Observable<any[]> {
    return this._firestore.collection(this.ACTIVITY_KEY).snapshotChanges();
  }
  getActivity(activityId: string) {
    return this._firestore.collection(`${this.ACTIVITY_KEY}`).doc(`${activityId}`).valueChanges();
  }
  async addNewActivity(activity: CurrentActivity) {
    const id = this._firestore.createId();
    await this._firestore.collection(`${this.ACTIVITY_KEY}`).doc(`${id}`).set(activity);
  }
  async updateActivity(activity: CurrentActivity) {
    await this._firestore.collection(`${this.ACTIVITY_KEY}`).doc(`${activity.activityId}`).set(activity);
  }
  async deleteActivity(activityId: string) {
    await this._firestore.collection(`${this.ACTIVITY_KEY}`).doc(`${activityId}`).delete();
  }

  mapActivityToLog(activity: CurrentActivity, h: number, m: number) {
    return {activityId: activity.activityId, deviceNo: activity.deviceNo, discount: 0, endTime: Date.now()
          , hours: h , minutes: m, ordersQty: activity.orders.reduce((total, item) => total += item.qty, 0)
          , pairsCount: activity.pairsCount
          , playingTotalPrice: 0, pricePerHour: 0, startTime: activity.startTime
          , sideOrdersTotalPrice: activity.orders.reduce((total, item) => total += item.qty * item.unitPrice, 0)} as ActivityLog;
  }

  async logActivity(activity: ActivityLog) {
    const id = this._firestore.createId();
    await this._firestore.collection(this.ACTIVITY_LOG_KEY).doc(`${id}`).set(activity);
  }

  getAllActivityLog(): Observable<any[]> {
    return this._firestore.collection(this.ACTIVITY_LOG_KEY).snapshotChanges();
  }

  // Prices List
  getPricesList(): Observable<any[]> {
    return this._firestore.collection(this.PRICES_KEY).snapshotChanges();
  }

  async addToPricesList(price: PriceCategory) {
    const id = this._firestore.createId();
    await this._firestore.collection(this.PRICES_KEY).doc(`${id}`).set(price);
  }

  async updatePricesList(price: PriceCategory) {
    await this._firestore.collection(this.PRICES_KEY).doc(`${price.id}`).set(price);
  }

  async deleteFromPricesList(priceId: string) {
    await this._firestore.collection(`${this.PRICES_KEY}`).doc(`${priceId}`).delete();
  }

  endActivity() {
    // TODO: it's already done but should be moved here.
  }
}
