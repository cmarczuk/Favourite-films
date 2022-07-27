import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Video } from 'src/app/interfaces/video';
import { VideoModalComponent } from '../video-modal/video-modal.component';

@Component({
  selector: 'app-video-box',
  templateUrl: './video-box.component.html',
  styleUrls: ['./video-box.component.sass']
})
export class VideoBoxComponent {

  @Input() video!: Video;

  constructor(public dialog: MatDialog) { }

  public openDialog(video: Video): void {
    this.dialog.open(VideoModalComponent, { data: { video: video } });
  }

}
