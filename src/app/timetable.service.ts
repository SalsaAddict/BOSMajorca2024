import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timetable } from './timetable';
import { firstValueFrom } from 'rxjs';
import { stringCompare } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class TimetableService {
  constructor(private readonly http: HttpClient) {}
  async load() {
    this._timetable = await firstValueFrom(
      this.http.get<Timetable.Timetable>(
        'https://salsaaddict.github.io/BOSMAJ24/assets/timetable.json'
      )
    );
    this.day = this.days[0];
    this.hour = this.day.Start;
    return;
  }
  private _timetable!: Timetable.Timetable;
  get days() {
    return this._timetable!.Days;
  }
  private _day!: Timetable.Day;
  private set day(value: string | Timetable.Day) {
    if (typeof value === 'string') {
      this._day =
        this.days.find((day) => stringCompare(day.Day, value)) ?? this.days[0];
    } else this._day = value;
  }
  get day(): Timetable.Day {
    return this._day;
  }
  hourOfDay(day: Timetable.Day, hour: number) {
    return hour >= day.Start ? hour : hour + 24;
  }
  private _hour!: number;
  private set hour(value: number | undefined) {
    if (value !== undefined) {
      let hour = this.hourOfDay(this._day, value),
        start = this.hourOfDay(this._day, this._day.Start),
        end = this.hourOfDay(this._day, this._day.End);
      if (hour < start) this._hour = this._day.Start;
      else if (hour > end) this._hour = this._day.End;
      else this._hour = hour;
    } else this._hour = this.day.Start;
  }
  get hour() {
    return this._hour;
  }
  setNow(day: string | Timetable.Day, hour?: number) {
    this.day = day;
    this.hour = hour;
    console.debug('now', day, this.day, hour, this.hour);
  }
}
