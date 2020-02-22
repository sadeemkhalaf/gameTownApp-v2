import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { CurrentActivity, TimerType, ActivityLog } from 'src/app/models/UserData';
import { takeWhile, map } from 'rxjs/operators';
import { timer, Observable, Subscription } from 'rxjs';
import { ActivityService } from 'src/app/main/services/activity.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-activity-card',
  templateUrl: './activity-card.component.html',
  styleUrls: ['./activity-card.component.scss'],
})
export class ActivityCardComponent implements OnInit {
  @ViewChild('box', {static: false} ) box: ElementRef;

  @Input() activity: CurrentActivity;
  public startTime: Date;
  public timer: number;
  public displayTimer: Date;
  public hours: number = 0;
  public minutes: number = 0;
  public seconds: number = 0;
  public endTime: Date;
  public timeDifference;

  private _tragetTimezone: number;
  private _alive = true;
  private _observable$: Observable<any>;
  private _subscription: Subscription;

  constructor(
    private _activityService: ActivityService,
    private _route: ActivatedRoute,
    private _router: Router) {
    this._observable$ = timer(0, 1000).pipe(
      takeWhile(() => this._alive), map(() => {
        this.startTime = new Date(this.activity.startTime);
      }));
  }

  ngOnInit() {
    if (this.activity.timerType.toLocaleLowerCase() === TimerType.UP) {
      this._subscription = this._observable$.subscribe( counter => {
        this.timer = (Date.now() - this.activity.startTime);
        this.displayTimer = new Date(this.timer);
        this.hours = this.displayTimer.getUTCHours();
        this.minutes = this.displayTimer.getUTCMinutes();
        this.seconds = this.displayTimer.getUTCSeconds();
       });
    } else if (this.activity.timerType.toLocaleLowerCase() === TimerType.DOWN) {
      this.endTime = new Date(this.activity.endTime);
      this._subscription = this._observable$.subscribe( () => {
        {
          this.timeDifference = this.endTime.getTime() -  new Date().getTime();
          this.hours = new Date(this.timeDifference).getHours() + new Date().getTimezoneOffset() / 60;
          this.minutes = new Date(this.timeDifference).getMinutes();
          this.seconds = new Date(this.timeDifference).getSeconds();
        }
        if (this.minutes === 0 && this.hours === 0 && this.seconds === 0) {
          this.endActivity();
        }
       });
    }
  }

  ionViewDidLeave() {
    this._alive = false;
    this._subscription.unsubscribe();
  }

  endActivity() {
    this.activity.priceSum = this.calculatePrice(this.activity) - this.calculatePrice(this.activity) * this.activity.discount;
    const activityLog: ActivityLog = this._activityService
                                     .mapActivityToLog(this.activity, this.hours, this.minutes);
    this._activityService.logActivity(activityLog);
    this._activityService.deleteActivity(this.activity.activityId);
  }

  animate() {
    this.box.nativeElement.classList.add('slideDownReturn');
  }

  navigateToEdit() {
    this._router.navigateByUrl(`edit-activity/${this.activity.activityId}`);
  }

  calculatePrice(activity: CurrentActivity) {
    return !!activity.priceSum
                             ? activity.priceSum + this._activityService.getMinutes(activity) * (activity.pricePerHour / 60)
                             : this._activityService.getMinutes(activity) * (activity.pricePerHour / 60);
  }
 }
