import { Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';

const title = 'BOS Majorca 2024';

export const routes: Routes = [
  {
    path: 'timetable/:day',
    component: TimetableComponent,
    title
  },
  {
    path: 'timetable/:day/:hour',
    component: TimetableComponent,
    title
  },
  {
    path: '**',
    redirectTo: '/timetable/thu'
  }
];
