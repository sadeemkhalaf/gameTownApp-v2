import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/main/services/activity.service';
import { debounceTime } from 'rxjs/operators';
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
  private _observable$: Observable<any>;
  private _subscription: Subscription = new Subscription();

  constructor(private _activityService: ActivityService,
              private _authService: AuthenticationService) { }

  ngOnInit() {
      this._observable$ = this._activityService.getAllActivityLog().pipe(debounceTime(300));
      this.loadLogs();
  }

  loadLogs() {
    this._subscription.unsubscribe();
    this._subscription = this._activityService.getAllActivityLog()
    .pipe(debounceTime(300))
    .subscribe(async (activity) => {
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
    this._subscription.unsubscribe();
  }

  ionViewCanEnter() {
    this._authService.isAuthenticated();
  }

  sortedList(logActivities: ActivityLog[]) {
    return logActivities.sort((a, b) => b.logTime - a.logTime && b.startTime - a.startTime );
  }

  doRefresh( event: any ) {
    this.loadLogs();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

}
