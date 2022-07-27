import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Video } from 'src/app/interfaces/video';
import { DataService } from 'src/app/services/data.service';
import { LoadingService } from 'src/app/services/loading.service';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.sass']
})
export class PaginationComponent implements OnInit {
  @Output() pageEvent: EventEmitter<Video[]> = new EventEmitter<Video[]>();

  videos!: Video[];
  numberDisplayedVideos = 16;
  pages: number[] = [];
  currentPage: number = 0;
  constructor(private data: DataService, private loading: LoadingService) { }
  ngOnInit() {
    this.data.displayVideos.subscribe((res) => { this.videos = res; this.loading.show(); setTimeout(() => { this.loading.hide(); this.loadPage(this.currentPage) }, 1000) })
  }

  public loadPage(nr: number): void {
    this.currentPage = nr;
    let currentVideos;
    if (this.pages[this.pages.length - 1] != Math.floor(this.videos.length / this.numberDisplayedVideos + 0.99)) {
      this.pages.length = Math.floor((this.videos.length / this.numberDisplayedVideos) + 0.99);
      this.pages = this.pages.fill(1, 0, this.pages.length).map((e, i) => i + 1);
    }
    if (this.videos.length > this.numberDisplayedVideos) {
      currentVideos = this.videos.slice(nr * this.numberDisplayedVideos, (nr + 1) * this.numberDisplayedVideos);
    }
    else {
      currentVideos = this.videos;
    }
    this.pageEvent.emit(currentVideos);
  }

  public nextPage(): void {
    if (this.pages.length > this.currentPage + 1) {
      this.loadPage(++this.currentPage);
    }
  }

  public previousPage(): void {
    if (this.currentPage - 1 >= 0)
      this.loadPage(--this.currentPage)
  }
}
