import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { environment } from '../../environments/environment';
import { HTTP, HTTPResponse } from '@awesome-cordova-plugins/http/ngx';

@Injectable({
  providedIn: 'root'
})
export class WpService {

  constructor(private httpNative: HTTP,private http: HttpClient, private platform: Platform) { }

  appGet(endPoint: string, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
      const url = environment.sitUrl + '/wp-json/wp/v2/' + endPoint + '?refresh-c=' + new Date().getTime();
      if (this.platform.is('hybrid')) {
        this.httpNative.setDataSerializer('json');
        this.httpNative.get(url,params,headers).then((res: HTTPResponse) => {
          const resData = JSON.parse(res.data);
          resolve(resData);
          }).catch((err: any) => {
           // alert(1 + err);
            reject(err);
          });
      } else {
        this.http.get(url, { params, headers }).toPromise().then((res: any) => {
          resolve(res);
          console.log(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      }
    });
  }

  appPost(endPoint: string, params = {}, headers = {}) {
    const url = environment.sitUrl + '/wp-json/wp/v2/' + endPoint + '?refresh-c=' + new Date().getTime();
    return new Promise((resolve, reject) => {
      if (this.platform.is('hybrid')) {
        this.httpNative.setDataSerializer('json');
        this.httpNative.post(url,params,headers).then((res: HTTPResponse) => {
          const resData = JSON.parse(res.data);
          resolve(resData);
          }).catch((err: any) => {
            reject(err);

          });
      } else {
        this.http.post(url, params, { headers }).toPromise().then((res: any) => {
          resolve(res);
          console.log(res);
        }).catch((err) => {
          console.log(err);
          reject(err);
        });
      }
    });
  }

}
