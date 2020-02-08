import { Component, OnInit, SimpleChanges } from '@angular/core';
import { CardState, PriceCategory } from 'src/app/models/UserData';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.page.html',
  styleUrls: ['./price-list.page.scss'],
})
export class PriceListPage implements OnInit {

  public backPath = 'menu/account-settings';
  public pricesList: { priceData: PriceCategory, cardState: CardState}[] = [];

  private _pricesListSubject: Subject<{ priceData: PriceCategory, cardState: CardState}[]> =
  new Subject<{ priceData: PriceCategory, cardState: CardState}[]>();

  constructor(private _activityService: ActivityService) {
    this.getPricesList().subscribe();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.pricesList = [];
  }

  addNewPrice() {
    this.pricesList.push({priceData: {} , cardState: CardState.NEW});
  }

  getPricesList() {
    return this._activityService.getPricesList().snapshotChanges().pipe(map(
      user => {
        this.pricesList = [];
        user.map(u => {
          const data = u.payload.doc.data() as unknown as PriceCategory;
          const id = u.payload.doc.id;
          data.id = id;
          this.pricesList.push({priceData: data, cardState: CardState.VIEW});
        });
      }));
  }

}
