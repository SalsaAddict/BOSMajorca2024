import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Timetable } from './timetable';
import { firstValueFrom } from 'rxjs';
import { stringCompare } from './system.service';

@Injectable({ providedIn: 'root' })
export class TimetableService {
  constructor(private readonly http: HttpClient) {}
  async load() {
    this._timetable = await firstValueFrom(
      this.http.get<Timetable.Timetable>(
        'https://salsaaddict.github.io/BOSMAJ24/assets/timetable.json'
      )
    );
    this.day = this.days[0];
    return;
  }
  private _timetable!: Timetable.Timetable;
  get days() {
    return this._timetable!.Days;
  }
  private _day!: Timetable.Day;
  set day(value: string | Timetable.Day) {
    if (typeof value === 'string') {
      this._day =
        this.days.find((day) => stringCompare(day.Day, value)) ?? this.days[0];
    } else this._day = value;
    this._hour = this.day.Start;
  }
  get day(): Timetable.Day {
    return this._day;
  }
  private _hour!: number;
  set hour(value: number | undefined) {
    if (value !== undefined) {
      let hour = this.hourOfDay(this._day, value),
        start = this.hourOfDay(this._day, this._day.Start),
        end = this.hourOfDay(this._day, this._day.End);
      if (hour < start) this._hour = this._day.Start;
      else if (hour > end) this._hour = this._day.End;
      else this._hour = hour;
    } else this._hour = this.day.Start;
  }
  get hour(): number {
    return this._hour;
  }
  hourOfDay(day: Timetable.Day, hour: number) {
    return hour >= day.Start ? hour : hour + 24;
  }
  toTime(day: Timetable.Day, hour: number) {
    let date = new Date(day.Date);
    date.setHours(this.hourOfDay(day, hour));
    return date;
  }
  get current() {
    return {
      index: this.days.indexOf(this.day),
      day: this.day,
      hour: this.hourOfDay(this.day, this.hour),
      start: this.hourOfDay(this.day, this.day.Start),
      end: this.hourOfDay(this.day, this.day.End)
    };
  }
  get areas() {
    return this._timetable.Areas;
  }
  get meals() {
    return this._timetable.Meals;
  }
  get items(): Timetable.DisplayItem[] {
    return this._timetable.Items.map((item) => {
      if (Timetable.isActivity(item)) {
        return {
          ...item,
          Opacity: 1,
          IsWorkshop: false
        };
      } else {
        let workshop = item as Timetable.Workshop;
        return {
          IsWorkshop: true,
          Day: workshop.Day,
          AreaId: workshop.AreaId,
          Hour: workshop.Hour,
          Hours: 1,
          Title: workshop.Act,
          Subtitle: workshop.Title,
          Description: workshop.Level,
          Category: workshop.Genre,
          Opacity: (workshop.LevelId + 1) * 0.2
        };
      }
    });
  }
}
