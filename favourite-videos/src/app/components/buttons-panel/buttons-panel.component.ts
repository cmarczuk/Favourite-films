import { Component } from '@angular/core';
import { Video } from 'src/app/interfaces/video';
import { DataService } from 'src/app/services/data.service';
import { ListDisplayService } from 'src/app/services/list-display.service';

@Component({
  selector: 'app-buttons-panel',
  templateUrl: './buttons-panel.component.html',
  styleUrls: ['./buttons-panel.component.sass']
})
export class ButtonsPanelComponent {

  listDisplay!: string;
  sortType: string = 'latest';
  constructor(private data: DataService, private ld: ListDisplayService) {
    this.ld.listDisplay.subscribe((res) => this.listDisplay = res);
  }

  public clearList(): void {
    this.data.clearData();
  }

  public loadDemo(): void {
    this.data.loadDemo();
  }

  private sortByDate(a: Video, b: Video) {
    return new Date(a.addedDate).getTime() - new Date(b.addedDate).getTime();
  }

  public sortByEldest(): void {
    this.sortType = 'eldest';
    this.data.saveVideos(this.data.getVideos().sort(this.sortByDate));
  }

  public sortByLatest(): void {
    this.sortType = 'latest'
    this.data.saveVideos(this.data.getVideos().sort((a, b) => this.sortByDate(b, a)));
  }

  public changeDisplay(type: string): void {
    this.ld.setDisplay(type);
  }
}
