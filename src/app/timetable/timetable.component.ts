import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { stringCompare, SystemService } from '../system.service';
import { PortraitComponent } from '../portrait/portrait.component';
import { LandscapeComponent } from '../landscape/landscape.component';
import { TimetableService } from '../timetable.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [PortraitComponent, LandscapeComponent],
  templateUrl: './timetable.component.html'
})
export class TimetableComponent implements OnChanges {
  @Input({ required: true }) day!: string;
  constructor(
    readonly system: SystemService,
    readonly timetable: TimetableService,
    readonly router: Router
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
    let day = changes['day'].currentValue,
      now = stringCompare(day, 'now');
    if (now) {
      day = new Date(Date.now())
        .toLocaleDateString('en-GB', {
          weekday: 'short'
        })
        .toLocaleLowerCase();
    }
    this.timetable.day = day;
    if (day === this.timetable.day.Day) {
      if (now) {
        let hour = Number(
          new Date(Date.now()).toLocaleTimeString('en-GB', { hour: '2-digit' })
        );
        this.timetable.hour = hour;
      }
      console.debug(changes, this.timetable.day, this.timetable.hour);
    } else {
      this.router.navigate(['/timetable', this.timetable.day.Day]);
    }
  }
}
