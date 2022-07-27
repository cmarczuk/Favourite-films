import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Video } from '../interfaces/video';
import { HttpService } from './http.service';
import { LocaleStorageService } from './localestorage.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private _videos = new BehaviorSubject<Video[]>([]);
  public videos = this._videos.asObservable();
  private _displayVideos = new BehaviorSubject<Video[]>([]);
  public displayVideos = this._displayVideos.asObservable();
  private demoVideos = [
    'k5E2AVpwsko',
    'bpOSxM0rNPM',
    '23o0evRtrFI',
    '724918260',
    '12155835',
    '719774611',
    '731865515',
    '333541450',
    '341825351',
    '355210534',
    'Qbu_FRg8vuU',
    'ekz6i58kVpI',
    'Pw-0pbY9JeU',
    'L3wKzyIN1yk',
    '7wtfhZwyrcc',
    'ktvTqknDobU',
    'UprcpdwuwCg',
    'UtF6Jej8yb4'
  ]

  constructor(private http: HttpService, private localStorage: LocaleStorageService) {
    this._videos.next(this.localStorage.getData());
    this.refreshVideos();
  }

  public updateDisplayVideos(newVideos: Video[]) {
    this._displayVideos.next(newVideos);
  }

  public saveVideos(videos: Video[]): void {
    this._videos.next(videos);
    this.localStorage.saveVideosLocalStorage(videos);
  }

  public addData(newVideo: Video): void {
    this._videos.value.unshift(newVideo);
    this.saveVideos(this._videos.value);
  }

  public removeVideo(idVideo: string): void {
    if (this.isAdded(idVideo)) {
      this.saveVideos(this._videos.value.filter((v) => { return v.id != idVideo }));
    }
  }

  public clearData(): void {
    this._videos.next([]);
    this.localStorage.clearData();
  }

  public refreshVideos(): void {
    let tmpVideos: Video[] = [];
    this._videos.value.forEach((v) => {
      if (v.id.length == 11) {
        this.http.getYtVideo(v.id)
          .subscribe(res => {
            Object.values(res)[2].map((item: any) => {
              tmpVideos.push({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                likeCount: item.statistics.likeCount,
                viewCount: item.statistics.viewCount,
                favourite: v.favourite,
                addedDate: new Date(v.addedDate)
              } as Video)
            })
          });
      }
      else {
        this.http.getVimeoVideo(v.id)
          .subscribe((res) => {
            tmpVideos.push(
              {
                id: v.id,
                title: v.title,
                thumbnail: Object.values(res)[19].sizes[3].link,
                likeCount: Object.values(res)[24].connections.likes.total,
                favourite: v.favourite,
                addedDate: v.addedDate
              } as Video
            )
          });
      }
    })

  }

  public isAdded(id: string): boolean {
    return this._videos.value.find((v: Video) => v.id === id) == null ? false : true;
  }

  public loadDemo(): void {
    this.clearData();
    this.demoVideos.forEach((id) => {
      if (id.length == 11) {
        this.http.getYtVideo(id)
          .subscribe((res) => {
            Object.values(res)[2].map((item: any) => {
              this.addData({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                likeCount: item.statistics.likeCount,
                viewCount: item.statistics.viewCount,
                favourite: false,
                addedDate: new Date()
              } as Video)
            })
          });
      }
      else {
        this.http.getVimeoVideo(id)
          .subscribe((res) => {
            this.addData(
              {
                id: id,
                title: Object.values(res)[1],
                thumbnail: Object.values(res)[19].sizes[3].link,
                likeCount: Object.values(res)[24].connections.likes.total,
                favourite: false,
                addedDate: new Date()
              } as Video
            )
          });
      }
    })
  }

  public changeFavourite(video: Video): void {
    if (this.isAdded(video.id)) {
      this._videos.value.forEach((v) => {
        if (v.id == video.id)
          v.favourite = !v.favourite;
      })
      this.saveVideos(this._videos.value);
    }
  }

  public getVideo(id: string) {
    return this._videos.value.find(v => v.id == id);
  }


  public getVideos() {
    return this._videos.value
  }
}
