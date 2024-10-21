import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { SystemService } from '../system.service';
import { PortraitComponent } from '../portrait/portrait.component';
import { LandscapeComponent } from '../landscape/landscape.component';
import { TimetableService } from '../timetable.service';
import { Timetable } from '../timetable';

@Component({
  selector: 'app-timetable',
  standalone: true,
  imports: [PortraitComponent, LandscapeComponent],
  templateUrl: './timetable.component.html'
})
export class TimetableComponent implements OnInit {
  @Input() day?: string;
  @Input() hour?: number;
  constructor(
    readonly system: SystemService,
    readonly timetable: TimetableService
  ) {}
  ngOnInit(): void {
    let day = this.day ?? this.timetable.days[0],
      hour = this.hour ?? this.timetable.day.Start;
    this.timetable.setNow(day, hour);
  }
}
