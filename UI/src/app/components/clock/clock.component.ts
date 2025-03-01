import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-clock',
  imports: [],
  templateUrl: './clock.component.html',
  styleUrl: './clock.component.scss'
})
export class ClockComponent implements OnInit, OnDestroy {

  constructor() { }

  private intervalId: any;
  time: string = "";

  ngOnInit(): void {
    this.intervalId = setInterval(() => this.updateTime(), 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }

  private updateTime() {
    const now = new Date();
    this.time = now.toLocaleTimeString('fi', {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
