import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentActivity, PriceCategory } from 'src/app/models/UserData';
import { ActivityService } from '../../services/activity.service';
import { take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-activity',
  templateUrl: './edit-activity.page.html',
  styleUrls: ['./edit-activity.page.scss'],
})
export class EditActivityPage implements OnInit {
  activityId: string;
  deviceNo: string;
  pairsCount: number;
  activity: CurrentActivity;
  private _observable$: Observable<any>;

  constructor(
    private _router: Router,
    private _activityService: ActivityService
    ) {
      this.activityId = this._router.url.split('/')[2];
      this._observable$ = this._activityService.getActivity(this.activityId).pipe(take(1));
      this._observable$.subscribe((act) => {
        this.deviceNo = act.deviceNo;
        this.pairsCount = act.pairsCount;
        this.activity = act;
      });
    }

  ngOnInit() {
  }

  prepareToSave() {
    this.activity.pairsCount = this.pairsCount;
    this.activity.deviceNo = this.deviceNo;
    this.activity.priceSum = !!this.activity.priceSum
                              ? this.activity.priceSum + this._getMinutes() * (3 / 60)
                              : this._getMinutes() * (3 / 60);
    this.activity.startTime = Date.now();
    // assume price = 3 JD per hour
    // 3 / 60 -> per minute
    // FIX ME LATER: when price is ready
    console.log(this._getMinutes(), this.activity.priceSum.toFixed(2), this.activity);
  }

  async submit() {
    this.prepareToSave();
    await this._activityService.updateActivity(this.activity).then(() => {
      this._router.navigateByUrl('menu/dashboard/activities');
    }, error => {
      console.log(error);
    });
  }

  private _getMinutes() {
    const startTime = new Date(this.activity.startTime).getTime();
    const currentTime = new Date().getTime();
    const difference = ((currentTime - startTime) / 1000) / 60;
    return Math.abs(Math.round(difference));
  }

}
