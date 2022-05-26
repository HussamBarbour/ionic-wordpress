import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { PostCardComponent, CommentsComponent } from  './components';
import { PostPipe } from './pipes/PostPipe';


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
        PostPipe
    ]
})
export class SharedModule { }
