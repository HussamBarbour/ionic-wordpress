import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { WpAuthService } from '../services/';


@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private auth: WpAuthService) { }

    async canActivate(): Promise<boolean> {
        await this.auth.checkToken();
        if (!this.auth.isAuthenticated()) {
            this.router.navigateByUrl('/login');
            return false;
        } else {
            return true;
        }
    }
}
