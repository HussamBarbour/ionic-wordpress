import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingService, ToastService, WpAuthService } from '../../../services';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;

  constructor(private loading: LoadingService,
    private toast: ToastService,
    private fb: FormBuilder,
    private navCtrl: NavController,
    private auth: WpAuthService) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  async login() {
    try {
      await this.loading.present('Signing in');
      await this.auth.login(this.loginForm.value);
      if (this.auth.isAuthenticated()) {
        this.navCtrl.navigateRoot('/account');
      } else {
        this.toast.show('Please check your username and password', 'danger');
      }
      this.loading.dismiss();
    } catch (r) {
      this.toast.show('An error occurred, please try again later', 'danger');
      this.loading.dismiss();
    }
  }
}
