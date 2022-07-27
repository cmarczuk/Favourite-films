import { Injectable } from '@angular/core';
import { Video } from '../interfaces/video';

@Injectable({
  providedIn: 'root'
})
export class LocaleStorageService {

  public saveVideosLocalStorage(videos: Video[]): void {
    localStorage.setItem('videos', JSON.stringify(videos))
  }

  public getData(): Video[] {
    let tmpVideos = localStorage.getItem('videos');
    if (tmpVideos) {
      return JSON.parse(tmpVideos);
    }
    else {
      return [];
    }
  }

  public clearData(): void {
    localStorage.setItem('videos', JSON.stringify([]))
  }

}
