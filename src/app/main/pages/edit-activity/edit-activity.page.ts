import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentActivity, PriceCategory } from 'src/app/models/UserData';
import { ActivityService } from '../../services/activity.service';
import { take, map } from 'rxjs/operators';
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
  private _pricesList: PriceCategory[];

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
    this._getPricesList().pipe(take(1)).subscribe();
    const updatedPrice = this._pricesList.find(value => value.pairsCount === this.pairsCount).pricePerHour;
    this.activity.pairsCount = this.pairsCount;
    this.activity.deviceNo = this.deviceNo;
    this.activity.priceSum = !!this.activity.priceSum
                              ? this.activity.priceSum + this._getMinutes() * (this.activity.pricePerHour / 60)
                              : this._getMinutes() * (this.activity.pricePerHour / 60);
    this.activity.startTime = Date.now();
    this.activity.pricePerHour = updatedPrice;
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

  private _getPricesList() {
    return this._activityService.getPricesList().snapshotChanges().pipe(map(
      user => {
        this._pricesList = [];
        user.map(u => {
          const data = u.payload.doc.data() as unknown as PriceCategory;
          const id = u.payload.doc.id;
          data.id = id;
          this._pricesList.push(data);
        });
      }));
  }

}
