import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListDisplayService {

  private _listDisplay = new BehaviorSubject<string>('kafelki');
  public listDisplay = this._listDisplay.asObservable();
  constructor() { }

  setDisplay(display: string): void {
    this._listDisplay.next(display);
  }
}
