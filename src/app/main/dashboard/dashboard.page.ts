import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivityService } from 'src/app/main/services/activity.service';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, OnDestroy {

  public activitiesLength: number = 0;
  public logsLength: number = 0;
  public _subscriptions: Subscription[] = [];

  constructor(private _activitySerice: ActivityService) {
              }

  ngOnInit() {
    const activitySubscription = this._activitySerice.getAllActivities().pipe().subscribe(data => {
      this.activitiesLength = data.length;
    });
    this._subscriptions.push(activitySubscription);
    const logSubscription = this._activitySerice.getAllActivityLog().pipe().subscribe(data => {
      this.logsLength = data.length;
    });
    this._subscriptions.push(logSubscription);
  }

  ngOnDestroy() {
    this._subscriptions.forEach(sub => sub.unsubscribe());
  }
}
