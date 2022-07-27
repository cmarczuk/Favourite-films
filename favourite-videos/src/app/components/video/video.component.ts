import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Video } from 'src/app/interfaces/video';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.sass']
})
export class VideoComponent implements OnInit {
  videoUrl?: SafeResourceUrl;
  video!: Video;
  id?: string;
  btnFavourite: string = 'btn btn-favourite';
  constructor(private route: ActivatedRoute,
    private data: DataService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')?.toString();
    if (this.id) {
      this.video = this.data.getVideo(this.id) || {} as Video ;
    }
    if (this.video?.id.length == 11) {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${this.video?.id}`)
    }
    else {
      this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://player.vimeo.com/video/${this.video?.id}`)
    }
  }
}
