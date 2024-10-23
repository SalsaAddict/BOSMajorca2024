import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [{ provide: APP_BASE_HREF, useValue: environment.appBaseUrl }],
  template: `<router-outlet />`,
  styles: []
})
export class AppComponent {
  title = 'BOSMajorca2024';
}
