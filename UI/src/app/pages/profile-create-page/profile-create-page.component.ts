import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserFormComponent } from '../../components/user-form/user-form.component';

@Component({
  selector: 'app-profile-create-page',
  imports: [RouterModule, UserFormComponent],
  templateUrl: './profile-create-page.component.html',
  styleUrl: './profile-create-page.component.scss',
  standalone: true,
})
export class ProfileCreatePageComponent
{

}
