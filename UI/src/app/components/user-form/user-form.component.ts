import { Component, Input, OnChanges } from '@angular/core';
import { UserForm } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss'
})
export class UserFormComponent implements OnChanges {
  @Input() user: UserForm = new UserForm();

  editForm!: FormGroup;

  ngOnChanges(): void {
    this.editForm = new FormGroup({
      username: new FormControl(this.user.username, Validators.required),
      firstName: new FormControl(this.user.firstName),
      lastName: new FormControl(this.user.lastName),
      password: new FormControl(this.user.password, Validators.required),
      confirmPassword: new FormControl(this.user.confirmPassword, Validators.required)
    });
  }
}
