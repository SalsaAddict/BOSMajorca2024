import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { debounceTime, fromEvent } from 'rxjs';
import { TimetableService } from './timetable.service';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  constructor(
    @Inject(DOCUMENT) readonly document: Document,
    private readonly timetable: TimetableService,
    zone: NgZone
  ) {
    fromEvent(window, 'resize').subscribe(() => {
      zone.run(() => {
        console.debug(
          'resize',
          this.window.innerWidth,
          this.window.innerHeight
        );
      });
    });
  }
  get window() {
    return this.document.defaultView!;
  }
  get isLandscape() {
    return this.window.innerWidth >= this.window.innerHeight;
  }
  get isPortrait() {
    return !this.isLandscape;
  }
}
