import { Component, OnInit, OnChanges } from '@angular/core';
import { UserData, UserRole } from 'src/app/models/UserData';
import { AuthenticationService } from '../services/authentication.service';
import { CardState } from '../../models/UserData';
import { map } from 'rxjs/operators';
import { SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from 'firebase';
@Component({
  selector: 'app-account-management',
  templateUrl: './account-management.page.html',
  styleUrls: ['./account-management.page.scss'],
})

export class AccountManagementPage implements OnInit, OnChanges {

  public backPath = 'menu/account-settings';
  public usersList: { userData: UserData, cardState: CardState}[] = [];

  private _usersListSubject: Subject<{ userData: UserData, cardState: CardState}[]> =
  new Subject<{ userData: UserData, cardState: CardState}[]>();

  constructor(private _authService: AuthenticationService) {
    this.getUsers().subscribe();
  }

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    this.usersList = [];
  }

  addNewUser() {
    this.usersList.push({userData: {} , cardState: CardState.NEW});
  }

  getUsers() {
    return this._authService.getAllUsers().snapshotChanges().pipe(map(
      user => {
        this.usersList = [];
        user.map(u => {
          const data = u.payload.doc.data() as unknown as UserData;
          const id = u.payload.doc.id;
          this.usersList.push({userData: data, cardState: CardState.VIEW});
        });
      }));
  }
}
