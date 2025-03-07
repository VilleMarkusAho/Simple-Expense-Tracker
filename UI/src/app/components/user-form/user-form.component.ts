import { Component, Input, OnChanges } from '@angular/core';
import { UserForm } from '../../models/user.model';
import { CommonModule } from '@angular/common';
import { FormGroup, FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { matchPasswords, validatePassword, validateUsernameAsync } from '../../utils/validators';
import { ProfileService } from '../../services/profile-service.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DeleteProfileDialogComponent } from '../delete-profile-dialog/delete-profile-dialog.component';

@Component({
  selector: 'app-user-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
  standalone: true
})
export class UserFormComponent implements OnChanges {

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  @Input() user: UserForm = new UserForm();

  editForm!: FormGroup;
  waitingResponse: boolean = false;

  submit(): void {
    if (this.editForm.invalid) {
      console.log("Invalid form");
      return;
    }

    if (this.user.isNewUser) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  openDeleteDialog(): void {
    this.dialog.open(DeleteProfileDialogComponent);
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

  private createUser(): void {
    this.waitingResponse = true;
    this.profileService.createUser(this.editForm.value).subscribe({
      next: () => {
        this.waitingResponse = false;
        alert("User created successfully");
        this.router.navigate(["/login"]);
      },
      error: error => {
        this.waitingResponse = false;
        console.error(error);
        alert("Failed to create user");
      }
    });
  };

  private updateUser(): void {
    this.waitingResponse = true;
    this.profileService.updateUser(this.editForm.value).subscribe({
      next: () => {
        this.waitingResponse = false;
        alert("User updated successfully");
        this.router.navigate(["/dashboard"]);
      },
      error: error => {
        this.waitingResponse = false;
        console.error(error);
        alert("Failed to update user");
      }
    });
  }
}
