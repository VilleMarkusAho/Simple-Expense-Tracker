import { LocalStorageKey, LocalStorageService } from './../../services/LocalStorage.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule, MatProgressSpinnerModule],
  providers: [AuthService],
  standalone: true
})
export class LoginPageComponent {

  constructor(
    private authService: AuthService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  username: string = environment.username || "";
  password: string = environment.password || "";

  waitingResponse: boolean = false;

  login(): void {
    this.waitingResponse = true;

    this.authService.login(this.username, this.password).subscribe({
      next: response => {
        this.waitingResponse = false;
        this.localStorage.setItem(LocalStorageKey.USER, response.result);
        this.router.navigate(["/dashboard"]);
      },
      error: err => {
        this.waitingResponse = false
        alert("Error: " + err.error?.message || err.message);
      }
    });
  }

  onFogotPasswordClick(): void {
    alert("Nothing happens");
  }
}
