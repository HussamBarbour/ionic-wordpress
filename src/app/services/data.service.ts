import { Injectable } from '@angular/core';
import type { WP_REST_API_Post,WP_REST_API_Posts } from 'wp-types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  currentPost: WP_REST_API_Post;
  constructor() { }
}
