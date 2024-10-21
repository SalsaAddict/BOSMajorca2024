import { ActivatedRoute, Router, Routes } from '@angular/router';
import { TimetableComponent } from './timetable/timetable.component';
import { inject } from '@angular/core';
import { TimetableService } from './timetable.service';

const title = 'BOS Majorca 2024';

export const routes: Routes = [
  {
    path: 'timetable/:day/:hour',
    component: TimetableComponent,
    title
  },
  {
    path: 'timetable/:day',
    canActivate: [
      () => {
        const route = inject(ActivatedRoute);
        const timetable = inject(TimetableService);
        timetable.setNow(route.snapshot.params['day']);
        console.debug('day', timetable.day, timetable.hour);
        return RedirectCommand();
      }
    ]
  }
];
