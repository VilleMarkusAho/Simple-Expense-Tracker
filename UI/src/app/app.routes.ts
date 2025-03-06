import { Routes } from '@angular/router';
import { AuthGuard } from './guards/AuthGuard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'login', loadComponent: () => import('./pages/login-page/login-page.component').then(m => m.LoginPageComponent) },
  { path: 'dashboard', canActivate: [AuthGuard], loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
  { path: 'profile/edit', canActivate: [AuthGuard], loadComponent: () => import('./pages/profile-edit-page/profile-edit-page.component').then(m => m.ProfileEditPageComponent) },
];
