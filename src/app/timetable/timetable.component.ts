import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
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
export class TimetableComponent implements OnInit {
  constructor(
    readonly system: SystemService,
    readonly timetable: TimetableService,
    private readonly router: Router
  ) {}
  @Input({ required: true }) day!: string;
  @Input({ required: true, transform: numberAttribute }) hour!: number;
  ngOnInit(): void {
    let day = this.timetable.day(this.day);
    if (day) {
      this.day = day.Day;
      if (isNaN(this.hour)) {
        this.go(this.day, day.Start);
      } else {
        let hour = this.timetable.hourOfDay(day, this.hour),
          start = this.timetable.hourOfDay(day, day.Start),
          end = this.timetable.hourOfDay(day, day.End) + 1;
        if (hour >= start && hour < end) {
          console.log('timetable', this.day, this.hour);
        } else {
          this.go(this.day, day.Start);
        }
      }
    } else {
      this.go(this.timetable.days[0].Day, this.timetable.days[0].Start);
    }
  }
  go(day: string, hour: number) {
    this.router.navigate(['/timetable', day.trim().toLowerCase(), hour]);
  }
}
