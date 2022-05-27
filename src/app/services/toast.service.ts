import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class ToastService {

    constructor(private toast: ToastController) { }

    async show(msg: string, color: any = 'dark', pos: any = 'bottom') {
        const toast = await this.toast.create({
            message: msg,
            duration: 3000,
            position: pos,
            color
        });

        return await toast.present();
    }

    async showWithClose(msg: string, css: string = 'err', pos: any = 'bottom', close: boolean = true) {
        const toast = await this.toast.create({
            color: 'danger',
            position: pos,
            message: msg,
            //showCloseButton: close,
            //closeButtonText: this.trans.getTrans('OK')
        });
        return await toast.present();
    }
}
