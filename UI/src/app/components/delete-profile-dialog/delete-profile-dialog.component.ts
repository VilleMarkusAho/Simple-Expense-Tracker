import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile-service.service';
import { AuthService } from '../../services/AuthService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.css'],
  imports: [MatDialogModule, CommonModule],
  standalone: true
})
export class DeleteProfileDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteProfileDialogComponent>,
    private profileService: ProfileService,
    private authService: AuthService
  ) { }

  waitingResponse: boolean = false;

  deleteProfile(): void {
    this.waitingResponse = true;

    this.profileService.deleteUser().subscribe({
      next: () => {
        this.waitingResponse = false;
        this.dialogRef.close();
        this.authService.logout();
        alert("Profile deleted successfully");
      },
      error: error => {
        this.waitingResponse = false
        alert("Error deleting profile: " + error.message);
      }
    });
  }

  close() {
    this.dialogRef.close();
  }
}
