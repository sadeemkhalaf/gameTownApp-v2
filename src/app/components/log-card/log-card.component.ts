import { Component, OnInit, Input } from '@angular/core';
import { ActivityLog } from 'src/app/models/UserData';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-log-card',
  templateUrl: './log-card.component.html',
  styleUrls: ['./log-card.component.scss'],
})
export class LogCardComponent implements OnInit {

  @Input() activityLog: ActivityLog;

  private _alive = true;
  private _observable$: Observable<any>;
  private _subscription: Subscription;

  constructor() { }

  ngOnInit() {}

  ionViewDidLeave() {
    this._alive = false;
    this._subscription.unsubscribe();
  }
}
