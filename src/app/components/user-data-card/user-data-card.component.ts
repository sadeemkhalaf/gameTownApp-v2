import { Component, OnInit, Input } from '@angular/core';
import { UserData, CardState } from '../../models/UserData';
import { AuthenticationService } from './../../main/services/authentication.service';


@Component({
  selector: 'app-user-data-card',
  templateUrl: './user-data-card.component.html',
  styleUrls: ['./user-data-card.component.scss'],
})

export class UserDataCardComponent implements OnInit {
  public currentState: CardState;
  @Input() userData: { userData: UserData, cardState: CardState};

  constructor(private _authService: AuthenticationService) {}

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

  private addNewUser(usedData: UserData, password: string) {
    this._authService.signup(usedData, password).then((res) => {
    }, error => console.error(error));
  }

  deleteUser(user: firebase.User) {
    this._authService.deleteUser(user.uid);
  }
}
