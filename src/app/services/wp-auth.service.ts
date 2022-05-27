import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { StorageService } from '../services/storage.service';
import { WpService } from '../services/wp.service';
import { environment } from '../../environments/environment';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';


export interface User {
    username: string;
    password: string;
}
const TOKEN_KEY = 'auth-token';

@Injectable({
    providedIn: 'root'
})
export class WpAuthService {
    token: string;
    authenticationState = new BehaviorSubject(false);
    url = environment.sitUrl + '/wp-json/jwt-auth/v1';
    me: any;
    constructor(private storage: StorageService, private http: HttpClient, private httpNative: HTTP,
        private router: Router, private platform: Platform, private wp: WpService) {
        // this.platform.ready().then(() =>{
        //   this.checkToken();
        // });
    }

    login(user: User) {
        return new Promise((resolve, reject) => {
            if (this.platform.is('hybrid')) {
                this.httpNative.post(this.url + '/token',user,{}).then((res: HTTPResponse) => {
                    const resData = JSON.parse(res.data);
                    this.token = `Bearer ${resData.token}`;
                    this.storage.set(TOKEN_KEY, `Bearer ${resData.token}`).then(() => {
                       // alert(JSON.stringify(res.data));
                        console.log(this.token);
                        this.authenticationState.next(true);
                        resolve(resData);
                    });
                }).catch((err: any) => {
                    console.log('error', err);
                    //alert(JSON.stringify(err));
                    reject(err);
                });
            } else {

                this.http.post(this.url + '/token', user).subscribe((res: any) => {
                    console.log(res);
                    this.token = `Bearer ${res.token}`;
                    this.storage.set(TOKEN_KEY, `Bearer ${res.token}`).then(() => {
                        console.log(this.token);
                        this.authenticationState.next(true);
                        resolve(res);
                    });
                }, (err: any) => {
                    console.log('error', err);
                    reject(err);

                });
            }

        });
    }
    isAuthenticated() {
        return this.authenticationState.value;
    }

    async checkToken() {
        return this.storage.getData(TOKEN_KEY).then(async (res) => {
            if (res) {
                this.token = res;
                this.authenticationState.next(true);
            }
            if (this.token) {
                await this.validate();
            }

        });
    }
    async logout() {
        return this.storage.removeKey(TOKEN_KEY).then(res => {
            this.authenticationState.next(false);
        });
    }

    async validate() {
        const headers = {
            'Content-Type': 'application/json; charset=utf-8',
            Accept: 'application/json',
            Authorization: `${this.token}`
        };
        console.log(this.token);
        return new Promise((resolve, reject) => {
            if (this.platform.is('hybrid')) {
                this.httpNative.post(this.url + '/token/validate?refresh-c=' + new Date().getTime(),{},headers)
                .then((res: HTTPResponse) => {
                    const resData = JSON.parse(res.data);
                    this.wp.appGet('users/me', { context: 'edit' }, headers).then((user: any) => {
                        this.me = user;
                        resolve(resData);
                    });
                }).catch((err: any) => {
                    console.log(err);
                    this.logout();
                    this.router.navigateByUrl('/login');
                    reject(err);
                });
            } else {
                this.http.post(this.url + '/token/validate?refresh-c=' + new Date().getTime(), {}, { headers })
                .toPromise().then((res: any) => {
                    console.log(res);
                    this.wp.appGet('users/me', { context: 'edit' }, headers).then((user: any) => {
                        this.me = user;
                        resolve(res);
                    });
                }).catch((err) => {
                    console.log(err);
                    this.logout();
                    this.router.navigateByUrl('/login');
                    reject(err);
                });
            }
        });
    }

    userPost(endPoint: string, params = {}) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
                Authorization: `${this.token}`
            };
            this.wp.appPost(endPoint, params, headers).then((res) => {
                resolve(res);
            });
        });
    }
}
