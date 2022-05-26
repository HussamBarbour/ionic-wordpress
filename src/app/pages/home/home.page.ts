import { Component, OnInit } from '@angular/core';
import { WpService } from '../../services';
import type { WP_REST_API_Posts } from 'wp-types';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts_params = {
    page: 1,
    per_page: 10,
    _embed:1
  };
  hasMoreItems = true;
  posts: WP_REST_API_Posts;
  constructor(private wp: WpService) { }

  ngOnInit() {
    this.loadData();
  }

  async loadData(){
    this.wp.appGet('posts',this.posts_params).then((channels: WP_REST_API_Posts)=>{
      this.posts = channels;
    });
  }

  loadMore(event){
    this.posts_params.page++;
    this.wp.appGet('posts',this.posts_params).then((res: WP_REST_API_Posts) => {
      this.posts.push.apply(this.posts,res);
      event.target.complete();
      if (res.length === 0) {this.hasMoreItems = false;}
    }).catch((e)=>{
      event.target.complete();
      this.hasMoreItems = false;
    });
  }
}
