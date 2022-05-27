import { Component } from '@angular/core';
import { WpAuthService } from './services';
import { NavController } from '@ionic/angular';
import { NgxPermissionsService } from 'ngx-permissions';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Login', url: '/account/login', icon: 'log-in' },

  ];
  constructor(
    private permissionsService: NgxPermissionsService,
    private navCtrl: NavController,
    private auth: WpAuthService) {
      this.checkPermissions();
  }

  async checkPermissions() {
    await this.auth.checkToken();
    let perm = ['GUEST'];
    if (this.auth.isAuthenticated()) {
      console.log(1);
      perm = ['ADMIN'];
    }
    this.permissionsService.loadPermissions(perm);
  }
  goTo(path: string) {
    this.navCtrl.navigateForward(path);
  }
  async logout() {
    await this.auth.logout();
    this.navCtrl.navigateRoot('/account/login');
  }
}
