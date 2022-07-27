import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { DataService } from 'src/app/services/data.service';


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
  constructor(private data: DataService, private router: Router) { }
  ngOnInit() {
    this.data.videos.subscribe((res) => { this.videos = res; setTimeout(() => this.loadPage(this.currentPage), 1000) })
  }

  public loadPage(nr: number): void {
    if (this.router.url == '/favourite') {
      this.videos = this.videos.filter((v) => v.favourite)
    }
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
