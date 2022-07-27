import { Component } from '@angular/core';
import { Video } from '../../interfaces/video';
import { LoadingService } from '../../services/loading.service';
import { DataService } from 'src/app/services/data.service';
import { ListDisplayService } from 'src/app/services/list-display.service';

@Component({
  selector: 'app-videos-list',
  templateUrl: './videos-list.component.html',
  styleUrls: ['./videos-list.component.sass']
})
export class VideosListComponent {
  videos: Video[] = [];
  displayedVideos?: Video[];
  currentPage: number = 0;
  listDisplay!: string;
  pages: number[] = [];
  loading = this.loader.loading;

  constructor(private data: DataService, public loader: LoadingService, private ld: ListDisplayService) {
    this.loader.show();
    this.data.displayVideos.subscribe((res) => {
      this.videos = res;
      setTimeout(() => {
        this.loader.hide();
      }, 1000)
    });
    this.ld.listDisplay.subscribe((res) => this.listDisplay = res);
  }

  public getPageVideos(newVideos: Video[]) {
    this.displayedVideos = newVideos;
  }
}
