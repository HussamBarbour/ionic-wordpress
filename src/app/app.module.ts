import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@awesome-cordova-plugins/http/ngx';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxPermissionsModule } from 'ngx-permissions';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,HttpClientModule,
    IonicStorageModule.forRoot({
      name: '__ionic_wordpress',
    }),
    NgxPermissionsModule.forRoot()
  ],
  providers: [HTTP,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
