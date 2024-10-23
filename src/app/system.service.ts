import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, NgZone } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TimetableService } from './timetable.service';

export function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0;
}

export function stringCompare(string1: string, string2: string) {
  let result = string1.localeCompare(string2, 'en-GB', {
    usage: 'search',
    sensitivity: 'base',
    ignorePunctuation: true
  });
  return result === 0;
}

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
