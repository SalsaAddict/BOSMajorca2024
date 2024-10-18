import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Timetable } from '../timetable';
import { TimetableService } from '../timetable.service';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-portrait',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './portrait.component.html',
  styles: ``
})
export class PortraitComponent {
  constructor(readonly timetable: TimetableService) {}
}
