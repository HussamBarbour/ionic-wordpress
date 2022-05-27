import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class LoadingService {
    load: any;

    constructor(private loader: LoadingController) { }

    async present(loadingText) {
        this.load = await this.loader.create({
            message: `<p class="bold">${loadingText}</p>`,
            spinner: 'crescent'
        });
        return await this.load.present();
    }

    async dismiss() {
        if (this.load) {
            return await this.load.dismiss();
        }
    }

}
