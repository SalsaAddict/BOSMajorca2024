import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation } from '@angular/core';
import { Timetable } from '../timetable';
import { TimetableService } from '../timetable.service';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { stringCompare } from '../system.service';
import { FavouriteService } from '../favourite.service';
import { Color } from '../color';

@Component({
  selector: 'app-portrait',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './portrait.component.html',
  styleUrl: './portrait.component.css',
  encapsulation: ViewEncapsulation.None
})
export class PortraitComponent {
  constructor(
    readonly timetable: TimetableService,
    private readonly fav: FavouriteService
  ) {}
  previous() {
    let current = this.timetable.current;
    if (current.hour > current.start) {
      this.timetable.hour = current.hour - 1;
    } else {
      if (current.index > 0) {
        this.timetable.day = this.timetable.days[current.index - 1];
        this.timetable.hour = this.timetable.day.End;
      }
    }
  }
  next() {
    let current = this.timetable.current;
    if (current.hour < current.end) {
      this.timetable.hour = current.hour + 1;
    } else {
      if (current.index + 1 < this.timetable.days.length) {
        this.timetable.day = this.timetable.days[current.index + 1];
      }
    }
  }
  getMeal() {
    let current = this.timetable.current;
    return this.timetable.meals.find((meal) => {
      return current.hour >= meal.hour && current.hour < meal.hour + meal.hours;
    });
  }
  getItemsByTime() {
    let current = this.timetable.current,
      hasFavourites = false,
      items = this.timetable.items.filter((activity) => {
        if (!stringCompare(activity.Day, current.day.Day)) return false;
        let start = this.timetable.hourOfDay(current.day, activity.Hour),
          end = start + activity.Hours;
        if (current.hour >= start && current.hour < end) return true;
        return false;
      });
    items.every((item) => {
      if (!item.IsWorkshop) return true;
      if (this.fav.find(item).length > 0) {
        hasFavourites = true;
        return false;
      }
      return true;
    });
    if (hasFavourites)
      items = items.map((item) => {
        if (item.IsWorkshop) {
          item.Favourite = this.fav.find(item).length > 0;
        }
        return item;
      });
    console.debug(items);
    return items;
  }
  getItemsByArea(items: Timetable.DisplayItem[], area: Timetable.Area) {
    return items.filter((item) => {
      return item.AreaId === area.Id;
    });
  }
  favourite(item: Timetable.DisplayItem) {
    if (item.Favourite) {
      this.fav.remove(item);
      item.Favourite = false;
    } else {
      item.Favourite = true;
      this.fav.add(item);
    }
  }
  bgImage(item: Timetable.DisplayItem) {
    return Color.itemBackgroundImage(item);
  }
}
