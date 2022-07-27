import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.sass']
})
export class FavouriteComponent implements OnInit {
  constructor(private data: DataService) {
  }
  ngOnInit(): void {
    this.data.videos.subscribe((res) => { this.data.updateDisplayVideos(res.filter((v) => v.favourite)) });
  }
}
