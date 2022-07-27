import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-delete-btn',
  templateUrl: './delete-btn.component.html',
  styleUrls: ['./delete-btn.component.sass']
})
export class DeleteBtnComponent {
  @Input() video!: Video;

  constructor(private data: DataService, private router: Router) { }

  public removeVideo(idVideo: string): void {
    this.data.removeVideo(idVideo);
    if(this.router.url.includes('video')){
      this.router.navigate(['home']);
    }
  }
}
