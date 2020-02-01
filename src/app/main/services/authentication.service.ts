import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import * as admin from 'firebase-admin';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { UserData } from 'src/app/models/UserData';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppHelperService } from './app-helper.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public currentUser: Subject<firebase.User> = new ReplaySubject<firebase.User>(1);
  private _isLoggedIn = new BehaviorSubject(false);

  private _currentUser: firebase.User = null;


  constructor(private _firestore: AngularFirestore
            , private _helper: AppHelperService,
              private _fireAuth: AngularFireAuth,
              private _storageService: StorageService) {
                this.ifLoggedIn();
              }

  public login(userData: any) {
      this._helper.presentLoading();
      return new Promise<any>((resolve, reject) => {
        firebase
          .auth()
          .signInWithEmailAndPassword(userData.email, userData.password)
          .then(
            result => {
              if (!!result) {
                this._storageService.addUser('USER_INFO', result.user).then(() => {
                resolve(result);
                this._currentUser = result.user;
                this.currentUser.next(this._currentUser);
                this._isLoggedIn.next(true);
              });
                this._helper.loadingController.dismiss();
              }
            },
            error => {
              this._helper.loadingController.dismiss();
              reject(error);
            }
          );
      });
  }
  public async logout() {
    this._fireAuth.auth.signOut().then(async () => {
      this._currentUser = null;
      this.currentUser.next(this._currentUser);
      this._isLoggedIn.next(false);
      await this._storageService.removeUser('USER_INFO');
  });
  }


  public signup(userData: UserData, password: string) {
    return new Promise<any>((resolve, reject) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(userData.email, password)
        .then(
          result => {
            resolve(result);
            result.user.displayName = userData.name;
            userData.uid = result.user.uid;
            this.addUserInfo(userData);
          },
          error => reject(error)
        );
    });
  }
  public getCurrentUser() {
    return firebase.auth().currentUser;
  }

  public async addUserInfo(userData: UserData) {
    await this._firestore
      .collection('Users')
      .doc(userData.uid)
      .set(userData);
  }

  public getAllUsers() {
    return this._firestore.collection<UserData[]>('Users');
  }

  public updateUser(userData: UserData) {
    return this._firestore
      .collection('Users')
      .doc(userData.uid)
      .set(userData);
  }

  public isAuthenticated() {
    return this._isLoggedIn.value;
  }

public deleteUser(uid: string) {
    this._firestore.firestore.doc(`Users/${uid}`).delete().then(async () => {
      // await admin.auth().deleteUser(uid);
    } , (error) => {
      console.log(error);
    });
}

  ifLoggedIn() {
    this._storageService.getUser('USER_INFO').then((response) => {
      if (response) {
        this._isLoggedIn.next(true);
        console.log(JSON.parse(response));
        this.currentUser.next(JSON.parse(response));
      }
    });
  }

}
