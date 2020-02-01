import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { CurrentActivity } from 'src/app/models/UserData';
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
  activity: CurrentActivity;
  private _observable$: Observable<any>;

  constructor(
    private _router: Router,
    private _activityService: ActivityService
    ) {
      this.activityId = this._router.url.split('/')[2];
      this._observable$ = this._activityService.getActivity(this.activityId).pipe(take(1));
      this._observable$.subscribe((act) => {
        this.activity = act;
      });
    }

  ngOnInit() {
  }

}
