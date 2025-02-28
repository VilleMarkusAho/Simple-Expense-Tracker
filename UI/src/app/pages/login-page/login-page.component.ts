import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule],
  providers: [AuthService],
  standalone: true
})
export class LoginPageComponent implements OnInit {

  constructor(private authService: AuthService) { }

  username: string = "";
  password: string = "";

  signningIn: boolean = false;

  login(): void {
    this.signningIn = true;

    this.authService.login(this.username, this.password).subscribe(() => {
      alert("Login successful");
      this.signningIn = false;
    }, (error) => {
      alert("Login failed");
      this.signningIn = false;
    });
  }

  onFogotPasswordClick(): void {
    alert("Nothing happens");
  }

  ngOnInit(): void {

  }

}
