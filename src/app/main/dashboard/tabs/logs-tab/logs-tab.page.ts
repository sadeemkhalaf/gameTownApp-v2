import { Component, OnInit } from '@angular/core';
import { ActivityService } from 'src/app/main/services/activity.service';
import { debounceTime, takeWhile } from 'rxjs/operators';
import { ActivityLog } from 'src/app/models/UserData';
import { Observable, Subscription, Subject, ReplaySubject } from 'rxjs';
import { AuthenticationService } from 'src/app/main/services/authentication.service';
import { NetworkService } from 'src/app/main/services/app-network.service';
import { AppHelperService } from 'src/app/main/services/app-helper.service';

@Component({
  selector: 'app-logs-tab',
  templateUrl: './logs-tab.page.html',
  styleUrls: ['./logs-tab.page.scss'],
})
export class LogsTabPage implements OnInit {

  public logActivities: ActivityLog[] = [];
  public keyword: string = '';
  public networkStatus = '';
  private $networkStatus: Subject<any> = new ReplaySubject<any>();

  private _observable$: Observable<any>;
  private _subscription: Subscription = new Subscription();

  constructor(private _activityService: ActivityService,
              private _authService: AuthenticationService,
              private _appHelper: AppHelperService,
              private _networkService: NetworkService) { }

  ngOnInit() {
    this.$networkStatus.subscribe(() => {
      this.networkStatus = this._networkService.getCurrentNetworkStatus() === 0
   || this._networkService.getCurrentNetworkStatus() === 1 ? 'online' : 'offline';
   });
    this.loadLogs();
  }

  loadLogs() {
    this._subscription.unsubscribe();
    this._subscription = this._activityService.getAllActivityLog()
    .pipe(
      debounceTime(300),
      takeWhile(() =>
      this._networkService.getCurrentNetworkStatus() === 0
      || this._networkService.getCurrentNetworkStatus() === 1))
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
    setTimeout(() => {
      this.loadLogs();
      event.target.complete();
      this._appHelper.presentToast('logs list refreshed');
    }, 2000);
  }

}
