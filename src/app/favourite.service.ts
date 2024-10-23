import { Injectable } from '@angular/core';
import { isNonEmptyString, SystemService } from './system.service';
import { Timetable } from './timetable';
import { TimetableService } from './timetable.service';

const key = 'fav';

@Injectable({ providedIn: 'root' })
export class FavouriteService {
  constructor(private readonly system: SystemService) {}
  private get localStorage() {
    return this.system.window.localStorage;
  }
  get favourites(): Timetable.DisplayItem[] {
    let item = this.localStorage.getItem(key);
    if (isNonEmptyString(item)) {
      return JSON.parse(item);
    } else return [];
  }
  set favourites(value) {
    this.localStorage.setItem(key, JSON.stringify(value));
  }
  add(item: Timetable.DisplayItem) {
    let f = this.favourites,
      remove = f.filter((favourite) => {
        return favourite.Day === item.Day && favourite.Hour === item.Hour;
      });
    remove.forEach((favourite) => {
      let i = f.indexOf(favourite);
      f.splice(i, 1);
    });
    f.push(item);
    this.favourites = f;
  }
  remove(item: Timetable.DisplayItem) {
    let f = this.favourites,
      remove = this.find(item);
    remove.forEach((favourite) => {
      let i = f.indexOf(favourite);
      f.splice(i, 1);
    });
    this.favourites = f;
  }
  find(item: Timetable.DisplayItem) {
    return this.favourites.filter((favourite) => {
      return (
        favourite.Day === item.Day &&
        favourite.Hour === item.Hour &&
        favourite.AreaId === item.AreaId &&
        favourite.Title === item.Title &&
        favourite.Subtitle === item.Subtitle &&
        favourite.Description === item.Description
      );
    });
  }
}
