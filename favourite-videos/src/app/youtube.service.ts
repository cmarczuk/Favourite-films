import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from './video';

@Injectable({
  providedIn: 'root'
})
export class YotubeService {

  API_YT_TOKEN = 'AIzaSyComhotVZpjfyikUaMQhqSp5gl1jxH-w88';
  API_YT_URL = 'https://www.googleapis.com/youtube/v3/videos?id='
  constructor(public http: HttpClient) { }
  video?: Video;

  getYtVideo(videoId: string) {
    let url = `${this.API_YT_URL}${videoId}&key=${this.API_YT_TOKEN}&part=snippet,statistics`;
    return this.http.get(url)
      .pipe(map((res) => {
        console.log(res)
        return res;
      }))
  }
}
