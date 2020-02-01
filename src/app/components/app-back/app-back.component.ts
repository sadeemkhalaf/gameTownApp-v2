import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-app-back',
  templateUrl: './app-back.component.html',
  styleUrls: ['./app-back.component.scss'],
})
export class AppBackComponent implements OnInit {
  @Input() path: string;
  constructor(private _navCtrl: NavController) { }

  ngOnInit() {}

  appBack() {
    this._navCtrl.navigateBack(this.path);
  }
}
