import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Video } from '../video';
import { YotubeService } from '../youtube.service';


@Component({
  selector: 'app-form-input-link',
  templateUrl: './form-input-link.component.html',
  styleUrls: ['./form-input-link.component.sass']
})
export class FormInputLinkComponent {
  video?: Video;
  urlForm: FormGroup;
  constructor(private fb: FormBuilder, private yt: YotubeService) {
    this.urlForm = this.fb.group({
      urlVideo: ['', Validators.required]
    })
  }

  searchVideo() {
    if (this.urlForm.valid) {
      let id = this.urlForm.get('urlVideo')!.value.split('/').pop().split('=').pop();
      if(id.length==11){
        this.yt.getYtVideo(id).subscribe(res => {
          return Object.values(res)[2].map((item: any) => {
            this.video = {
              id: item.id,
              title: item.snippet.title,
              thumbnail: item.snippet.thumbnails.high.url,
              likeCount: item.statistics.likeCount,
              viewCount: item.statistics.viewCount
            } as Video
          })
        });
      }
      else{

      }
      }

    else {

    }
  }
}
