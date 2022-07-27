import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Video } from 'src/app/interfaces/video';

@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.component.html',
  styleUrls: ['./video-modal.component.sass']
})
export class VideoModalComponent {
  video: Video;
  videoUrl: SafeResourceUrl;
  constructor(
    public dialogRef: MatDialogRef<VideoModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {
    this.video = data.video;
    if (this.video.id.length == 11) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video.id}`)
    }
    else {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.video.id}`)
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}
