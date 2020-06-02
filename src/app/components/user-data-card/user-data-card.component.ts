import { Component, OnInit, Input } from '@angular/core';
import { UserData, CardState } from '../../models/UserData';
import { AuthenticationService } from './../../main/services/authentication.service';
import { AppHelperService } from 'src/app/main/services/app-helper.service';


@Component({
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
  styleUrls: ['./user-data-card.component.scss'],
})

export class UserDataCardComponent implements OnInit {
  public currentState: CardState;
  @Input() userData: { userData: UserData, cardState: CardState};

  constructor(
    private _authService: AuthenticationService,
    private _appHelper: AppHelperService
    ) {}

  ngOnInit() {
    this.currentState = this.userData.cardState;
  }

  updateUser() {
    this._authService.updateUser(this.userData.userData);
  }

  changeState(cancel?: boolean) {
    this.currentState = (this.currentState === CardState.EDIT) || (this.currentState === CardState.NEW)
    ? CardState.VIEW : CardState.EDIT;
    if (cancel) {
      this.userData.cardState = CardState.DELETED;
      this.currentState = CardState.DELETED;
    }
  }

  addUser() {
    console.log(this.userData);
    this.addNewUser(this.userData.userData, '123456789');
    this.changeState();
  }

  resetUserPassword() {
    this._authService.resetPassword(this.userData.userData.email).then(() => {
      this._appHelper.presentToast('reset password email sent successfully');
    }, () => {
      this._appHelper.presentToast('something went wrong, try later');
    });
  }

  private addNewUser(usedData: UserData, password: string) {
    this._authService.signup(usedData, password).then((res) => {
    }, error => console.error(error));
  }

  deleteUser() {
    this._authService.deleteUser(this.userData.userData.uid);
  }
}
