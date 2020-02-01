import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/main/services/activity.service';
import { take, debounceTime, takeWhile } from 'rxjs/operators';
import { ActivityLog } from 'src/app/models/UserData';
import { Observable, Subscription } from 'rxjs';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

@Component({
  selector: 'app-logs-tab',
  templateUrl: './logs-tab.page.html',
  styleUrls: ['./logs-tab.page.scss'],
})
export class LogsTabPage implements OnInit {

  public logActivities: ActivityLog[] = [];
  public keyword: string = '';
  private _alive = true;
  private _observable$: Observable<any>;
  private _subscription: Subscription;

  constructor(private _activityService: ActivityService,
              private _authService: AuthenticationService) { }

  ngOnInit() {
      this._observable$ = this._activityService.getAllActivityLog().pipe(debounceTime(300), takeWhile(() => this._alive));
      this._subscription = this._observable$.subscribe(async (activity) => {
        this.logActivities = [];
        await activity.map((current) => {
        const data = current.payload.doc.data() as ActivityLog;
        const id = current.payload.doc.id;
        data.activityId = id;
        this.logActivities.push(data);
      });
    });
  }

  ionViewDidLeave() {
    this._alive = false;
    this._subscription.unsubscribe();
  }

  ionViewCanEnter() {
    this._authService.isAuthenticated();
  }

  sortedList(logActivities: ActivityLog[]) {
    return logActivities.sort((a, b) => b.logTime - a.logTime );
  }

}
