import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';

@Component({
  selector: 'app-global-header',
  imports: [CommonModule, ClockComponent],
  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss'
})
export class GlobalHeaderComponent implements OnInit {

  date: string = '';

  ngOnInit(): void {
    const now = new Date();
    this.date = now.toLocaleDateString('fi', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

}
