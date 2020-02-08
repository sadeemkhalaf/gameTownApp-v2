import { Component, OnInit, Input } from '@angular/core';
import { CardState, PriceCategory } from 'src/app/models/UserData';
import { ActivityService } from 'src/app/main/services/activity.service';

@Component({
  selector: 'app-price-card',
  templateUrl: './price-card.component.html',
  styleUrls: ['./price-card.component.scss'],
})
export class PriceCardComponent implements OnInit {

  public currentState: CardState;

  @Input() priceData: { priceData: PriceCategory, cardState: CardState};

  constructor(private _activityService: ActivityService) {}

  ngOnInit() {
    this.currentState = this.priceData.cardState;
  }

  updatePrice() {
    this._activityService.updatePricesList(this.priceData.priceData);
  }

  changeState(cancel?: boolean) {
    this.currentState = (this.currentState === CardState.EDIT) || (this.currentState === CardState.NEW)
    ? CardState.VIEW : CardState.EDIT;
    if (cancel) {
      this.priceData.cardState = CardState.DELETED;
      this.currentState = CardState.DELETED;
    }
  }

  addPrice() {
    this.addNewPriceCategory(this.priceData.priceData);
    this.changeState();
  }

  private addNewPriceCategory(priceData: PriceCategory) {
    this._activityService.addToPricesList(priceData);
  }

  deletePriceCategory() {
    this._activityService.deleteFromPricesList(this.priceData.priceData.id);
  }

}
