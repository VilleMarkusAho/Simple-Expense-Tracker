import { Component } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { ProfileService } from '../../services/profile-service.service';

@Component({
  selector: 'app-delete-profile-dialog',
  templateUrl: './delete-profile-dialog.component.html',
  styleUrls: ['./delete-profile-dialog.component.css'],
  imports: [MatDialogModule],
  standalone: true
})
export class DeleteProfileDialogComponent {

  constructor(
    private dialogRef: MatDialogRef<DeleteProfileDialogComponent>,
    private profileService: ProfileService,
  ) { }

  close() {
    this.dialogRef.close();
  }
}
