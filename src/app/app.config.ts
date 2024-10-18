import { APP_INITIALIZER, ApplicationConfig, isDevMode } from '@angular/core';
import {
  provideRouter,
  UrlSerializer,
  withComponentInputBinding
} from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideServiceWorker } from '@angular/service-worker';
import { TimetableService } from './timetable.service';
import { LowerCaseUrlSerializer } from '../lower-case-url-serializer';

function initializeApp(timetable: TimetableService) {
  return () => timetable.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withComponentInputBinding()),
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    }),
    provideHttpClient(),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      multi: true,
      deps: [TimetableService]
    },
    {
      provide: UrlSerializer,
      useClass: LowerCaseUrlSerializer
    }
  ]
};
