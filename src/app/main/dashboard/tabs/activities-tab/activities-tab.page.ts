import { Component, OnInit, OnDestroy } from '@angular/core';
import { NewDeviceActivityComponent } from 'src/app/components/new-device-activity/new-device-activity.component';
import { CurrentActivity } from 'src/app/models/UserData';
import { debounceTime, takeWhile, map } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ActivityService } from 'src/app/main/services/activity.service';
import { AuthenticationService } from 'src/app/main/services/authentication.service';

@Component({
  selector: 'app-activities-tab',
  templateUrl: './activities-tab.page.html',
  styleUrls: ['./activities-tab.page.scss'],
})
export class ActivitiesTabPage implements OnInit, OnDestroy {

  public currentActivities: CurrentActivity[] = [];
  public filteredActivities: CurrentActivity[] = [];
  public keyword: string;
  private _alive = true;
  private _subscription: Subscription = new Subscription();

  constructor(private _modalController: ModalController,
              private _activityService: ActivityService,
              private _authService: AuthenticationService) {}

  ngOnInit() {
    this.loadActivities();
  }

  loadActivities() {
    this._subscription.unsubscribe();
    this._subscription = this._activityService.getAllActivities().pipe(
      debounceTime(150),
      takeWhile(() => this._alive))
      .subscribe((activity) => {
      this.currentActivities = [];
      activity.map((current) => {
        const data = current.payload.doc.data() as CurrentActivity;
        const id = current.payload.doc.id;
        data.activityId = id;
        this.currentActivities.push(data);
      });
    });
  }

  ngOnDestroy() {
    this._alive = false;
    this._subscription.unsubscribe();
  }

  async presentModal() {
    const modal = await this._modalController.create({
      component: NewDeviceActivityComponent,
      backdropDismiss: false,
      animated: true,
      cssClass: 'activity-modal'
    });
    return await modal.present();
  }

  ionViewDidLeave() {}

  ionViewCanEnter() {
    this._authService.isAuthenticated();
  }

  doRefresh( event: any ) {
    this.loadActivities();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }
}
