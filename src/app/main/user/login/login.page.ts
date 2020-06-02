import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { AuthenticationService } from '../../services/authentication.service';
import { AppHelperService } from '../../services/app-helper.service';
import { NetworkService } from '../../services/app-network.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // TODOs:
  // show login loader after Login is button clicked, if failed to login, return a toaster
  // inject a network service to check for connection
  // a platform helper for device type check

  constructor(
    private navCtrl: NavController,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private _appHelper: AppHelperService,
    private _networkService: NetworkService
  ) { }

  public loginForm: FormGroup;
  public networkStatus;
  public errorMessage: string;

  validationMessages = {
    email: [
      { type: 'required', message: 'Email is required.' },
      { type: 'pattern', message: 'Please enter a valid email.' }
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
      { type: 'minlength', message: 'Password must be at least 5 characters long.' }
    ]
  };

  ngOnInit() {
    this.networkStatus = this._networkService.getCurrentNetworkStatus() === 0
      || this._networkService.getCurrentNetworkStatus() === 1 ? 'Online' : 'Offline';
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(5),
        Validators.required
      ])),
    });
  }

  loginUser(value: any) {
    this.authService.login(value)
    .then(() => {
      this.navCtrl.navigateForward('/menu');
    }, err => {
      this.errorMessage = err.message;
      this._appHelper.presentToast(err.message);
      this._appHelper.loadingController.dismiss();
    });
  }
}
