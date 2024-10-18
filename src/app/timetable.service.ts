import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timetable } from './timetable';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private readonly http: HttpClient) {}
  async load() {
    this.timetable = await firstValueFrom(
      this.http.get<Timetable.Timetable>(
        'https://salsaaddict.github.io/BOSMAJ24/assets/timetable.json'
      )
    );
    return;
  }
  timetable?: Timetable.Timetable;
  get isLoaded() {
    return this.timetable !== undefined;
  }
  get days() {
    return this.timetable!.Days;
  }
  day(abbreviation: string) {
    return this.days.find(
      (day) => day.Day.toLowerCase() === abbreviation.toLowerCase()
    );
  }
  hourOfDay(day: Timetable.Day, hour: number) {
    return hour >= day.Start ? hour : hour + 24;
  }
}
