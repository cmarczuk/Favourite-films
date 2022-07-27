import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Video } from 'src/app/interfaces/video';
import { HttpService } from 'src/app/services/http.service';
import { DataService } from 'src/app/services/data.service';


@Component({
  selector: 'app-form-input-link',
  templateUrl: './form-input-link.component.html',
  styleUrls: ['./form-input-link.component.sass']
})

export class FormInputLinkComponent {
  urlForm: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpService, private data: DataService) {
    this.urlForm = this.fb.group({
      urlVideo: ['', Validators.required]
    })
  }

  public addVideo(): void {
    if (this.urlForm.valid) {
      let url = this.urlForm.get('urlVideo')!.value;
      let id = url.substr(-11).split('/').length > 1 ? url.split('/').pop() : url.substr(-11);
      if (!this.data.isAdded(id)) {
        if (id.length == 11) {
          this.http.getYtVideo(id).subscribe(res => {
            return Object.values(res)[2].map((item: any) => {
              this.data.addData({
                id: item.id,
                title: item.snippet.title,
                thumbnail: item.snippet.thumbnails.high.url,
                likeCount: item.statistics.likeCount,
                viewCount: item.statistics.viewCount,
                favourite: false,
                addedDate: new Date()
              } as Video)
            })
          });
        }
        else {
          this.http.getVimeoVideo(id).subscribe((res) => {
            this.data.addData(
              {
                id: id,
                title: Object.values(res)[1],
                thumbnail: Object.values(res)[19].sizes[3].link,
                likeCount: Object.values(res)[24].connections.likes.total,
                favourite: false,
                addedDate: new Date()
              } as Video
            )
          })
        }
      }
    }
  }
}
