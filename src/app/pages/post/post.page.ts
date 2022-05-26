import { Component, OnInit } from '@angular/core';
import { DataService, WpService } from '../../services';
import type { WP_REST_API_Post } from 'wp-types';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.page.html',
  styleUrls: ['./post.page.scss'],
})
export class PostPage implements OnInit {
  post: WP_REST_API_Post;
  constructor(public data: DataService, private route: ActivatedRoute, private wp: WpService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    if (this.data.currentPost) {
      this.post = this.data.currentPost;
    } else {
      const id = this.route.snapshot.paramMap.get('id');
      this.wp.appGet('posts/' + id, { _embed: 1 }).then(async (res: WP_REST_API_Post) => {
        this.post = res;
      });
    }
  }
}
