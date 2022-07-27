import { Component, Input } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Video } from '../../interfaces/video';

@Component({
  selector: 'app-favourite-btn',
  templateUrl: './favourite-btn.component.html',
  styleUrls: ['./favourite-btn.component.sass']
})
export class FavouriteBtnComponent {
  @Input() video!: Video;
  btnFavourite: string = 'btn btn-favourite';

  constructor(private data: DataService) { }

  public changeFavourite(video: Video): void {
    this.data.changeFavourite(video);
    if (!video.favourite) {
      this.btnFavourite = 'btn btn-favourite'
    }
    else {
      this.btnFavourite = 'btn btn-favourite-active';
    }
  }
}
