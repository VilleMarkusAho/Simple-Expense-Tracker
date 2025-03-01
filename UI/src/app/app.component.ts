import { Component, OnDestroy } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { GlobalHeaderComponent } from './components/global-header/global-header.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GlobalHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showHeader = !['/login'].includes(this.router.url);
    });
  }

  showHeader: boolean = false;
  currentYear: number = new Date().getFullYear();
}
