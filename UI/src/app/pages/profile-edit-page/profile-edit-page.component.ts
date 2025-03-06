import { LocalStorageService } from './../../services/LocalStorage.service';
import { Component, OnInit } from '@angular/core';
import { UserFormComponent } from '../../components/user-form/user-form.component';
import { UserForm } from '../../models/user.model';
import { AuthService } from '../../services/AuthService.service';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css'],
  imports: [UserFormComponent],
  standalone: true
})
export class ProfileEditPageComponent implements OnInit {

  constructor(private localStorage: LocalStorageService, private authService: AuthService) {
    const user = this.localStorage.getUser();
    this.user = new UserForm(user);
  }

  user: UserForm;

  ngOnInit() {

  }
}
