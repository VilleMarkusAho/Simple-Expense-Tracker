import { Component, Input, OnChanges } from '@angular/core';
import { UserForm } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { matchPasswords, validatePassword, validateUsernameAsync } from '../../utils/validators';
import { ProfileService } from '../../services/profile-service.service';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true
})
export class UserFormComponent implements OnChanges {

  constructor(private profileService: ProfileService) { }

  @Input() user: UserForm = new UserForm();

  editForm!: FormGroup;
  waitingResponse: boolean = false;

  submit(): void {

  }

  createForm(): void {
    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, [], [validateUsernameAsync(this.profileService)]),
      firstName: new FormControl(this.user.firstName, Validators.maxLength(30)),
      lastName: new FormControl(this.user.lastName, Validators.maxLength(30)),
      password: new FormControl("", validatePassword),
      confirmPassword: new FormControl(""),
    }, {
      validators: [matchPasswords]
    });
  }

  ngOnChanges(): void {
    this.createForm();
  }


}
