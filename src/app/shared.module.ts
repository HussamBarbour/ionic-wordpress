import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostCardComponent, CommentsComponent } from  './components';
import { PostPipe } from './pipes/PostPipe';
import { NgxPermissionsModule } from 'ngx-permissions';


@NgModule({
    declarations: [
        PostCardComponent,
        CommentsComponent,
        PostPipe
    ],
    imports: [
        CommonModule,
        IonicModule,
    ],
    providers: [
    ],
    exports: [
        PostCardComponent,
        CommentsComponent,
        PostPipe,
        NgxPermissionsModule
    ]
})
export class SharedModule { }
