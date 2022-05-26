/* eslint-disable no-underscore-dangle */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';


@Pipe({
    name: 'post'
})
export class PostPipe implements PipeTransform {
    constructor() {
    }


    transform(post: any, type: string, data = []) {
        switch (type) {
            case 'image':
                if (post && post._embedded && post._embedded['wp:featuredmedia']) {
                    return post._embedded['wp:featuredmedia'][0].source_url;
                }
                return 'https://via.placeholder.com/1024x576';
            case 'term':
                if (post && post._embedded && post._embedded['wp:term']) {
                    return post._embedded['wp:term'][0][0].name;
                }
                return '';
            case 'excerpt':
                if (post && post.excerpt.rendered) {
                    return post.excerpt.rendered.substr(0, data[0]) + '...';
                }
                return '';


            case 'date-ago':
                return moment(post.date, 'YYYYMMDD').fromNow();
                return '';
            default:
                return '';
        }
    }
}
