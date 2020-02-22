import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicStorageModule } from '@ionic/Storage';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthenticationService } from './main/services/authentication.service';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from 'src/environments/environment';
import * as firebase from 'firebase/app';
import { ReactiveFormsModule } from '@angular/forms';
import {AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
import { AuthGuardService } from './main/services/auth-guard.service';
import { StorageService } from './main/services/storage.service';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { NetworkService } from './main/services/app-network.service';
import { AppHelperService } from './main/services/app-helper.service';
import { Network } from '@ionic-native/network/ngx';




firebase.initializeApp(environment.firebaseConfig);

// admin.initializeApp({
//   credential: admin.credential.applicationDefault(),
//   databaseURL: 'https://<DATABASE_NAME>.firebaseio.com'
// });
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot({
      scrollAssist: false,
      scrollPadding: true
    }),
    AppRoutingModule,
    AngularFireAuthModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    IonicStorageModule.forRoot(),
    ChartsModule,
    BrowserAnimationsModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    AuthenticationService,
    AuthGuardService,
    StorageService,
    LocalNotifications,
    NetworkService,
    AppHelperService,
    Network
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
