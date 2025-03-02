import { LocalStorageService } from './../../services/LocalStorage.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ClockComponent } from '../clock/clock.component';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-global-header',
  imports: [CommonModule, ClockComponent],
  templateUrl: './global-header.component.html',
  styleUrl: './global-header.component.scss'
})
export class GlobalHeaderComponent implements OnInit {

  constructor(private localStorage: LocalStorageService) {
    this.user = this.localStorage.getUser();
  }

  date: string = '';
  user: IUser | null;

  ngOnInit(): void {
    this.user = this.localStorage.getUser();

    const now = new Date();
    this.date = now.toLocaleDateString('fi', {
      weekday: 'short',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}
