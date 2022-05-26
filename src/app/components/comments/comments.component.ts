import { Component, OnInit, Input } from '@angular/core';
import type { WP_REST_API_Comments, WP_REST_API_Post } from 'wp-types';
import { WpService } from '../../services';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  @Input() post: WP_REST_API_Post;
  comments: WP_REST_API_Comments;
  constructor(private wp: WpService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData() {
    this.wp.appGet('comments', { post: this.post.id }).then(async (res: WP_REST_API_Comments) => {
      this.comments = res;
    });
  }

}
