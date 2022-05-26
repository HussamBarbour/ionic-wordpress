import { Component, OnInit, Input } from '@angular/core';
import { NavController } from '@ionic/angular';
import type { WP_REST_API_Post } from 'wp-types';
import { DataService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit {
  @Input() post: WP_REST_API_Post;
  constructor(private data: DataService, private navCtrl: NavController, private router: Router) { }

  ngOnInit() {}
  openPost(post: WP_REST_API_Post){
    this.data.currentPost = this.post;
    this.navCtrl.navigateForward(this.router.url + '/post/' + post.id);
  }
}
