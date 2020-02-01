import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CurrentActivity, OrderItem, ActivityLog } from '../../models/UserData';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {
  private ACTIVITY_KEY: string = 'activities';
  private ACTIVITY_LOG_KEY: string = 'activitiesLog';
  constructor(private _firestore: AngularFirestore) {
  }

  getAllActivities() {
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
    console.log(activity);
    await this._firestore.collection(this.ACTIVITY_LOG_KEY).doc(`${id}`).set(activity);
  }

  getAllActivityLog() {
    return this._firestore.collection(this.ACTIVITY_LOG_KEY).snapshotChanges();
  }
  // TODO: later for reciept and logs
  endActivity() {
    // for now it's just deleting the activity
  }
}
