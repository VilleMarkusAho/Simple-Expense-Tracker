import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  imports: [CommonModule, FormsModule],
  standalone: true
})
export class LoginPageComponent implements OnInit {

  constructor() { }

  username: string = "";
  password: string = "";

  ngOnInit() {
  }

}
