import { Component } from '@angular/core';
import { Video } from '../../interfaces/video';
import { LoadingService } from '../../services/loading.service';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.sass']
})
export class VideosListComponent {
  videos: Video[] = [];
  displayedVideos?: Video[];
  currentPage: number = 0;
  listDisplay: string = 'kafelki';
  pages: number[] = [];
  loading = this.loader.loading;
  numberDisplayedVideos = 16;

  constructor(private data: DataService, public loader: LoadingService) {
    this.loader.show();
    this.data.videos.subscribe((res) => {
      this.videos = res;
      setTimeout(() => {
        this.loader.hide();
      }, 1000)
    });
  }

  public getPageVideos(newVideos: Video[]) {
    this.displayedVideos = newVideos;
  }

  public clearList(): void {
    this.data.clearData();
  }

  public loadDemo(): void {
    this.data.loadDemo();
  }

  private sortByDate(a: Video, b: Video) {
    return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
  }

  public sortByEldest(): void {
    this.data.saveVideos(this.videos.sort(this.sortByDate));
  }

  public sortByLatest(): void {
    this.data.saveVideos(this.videos.sort((a, b) => this.sortByDate(b, a)));
  }

  public changeDisplay(type: string): void {
    switch (type) {
      case 'kafelki':
        this.listDisplay = 'kafelki'
        break;
      case 'lista':
        this.listDisplay = 'lista'
        break;
    }
  }
}
