import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProfileService } from '../services/profile-service.service';
import { catchError, debounce, debounceTime, map, Observable, of, switchMap } from 'rxjs';
import { IUser } from '../models/user.model';

export function matchPasswords(control: AbstractControl): ValidationErrors | null {
  const password = control.get<string>('password')?.value;
  const confirmPassword = control.get<string>('confirmPassword')?.value;

  // Confirm password is optional, until the password is entered
  if (confirmPassword && password !== confirmPassword) {
    return { passwordsDoNotMatch: true };
  }

  return null;
}

export function validatePassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get<string>('password')?.value;
  let errors: any = {};

  // Password is optional, until the password is entered
  if (!password) {
    return null;
  }

  if (password.length < 8) {
    errors["passwordTooShort"] = true;
  }

  if (password.includes(" ")) {
    errors["passwordContainsSpace"] = true;
  }

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  return null;
}

export function validateUsernameAsync(profileService: ProfileService): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    const user = localStorage.getItem('user') as IUser | null;
    const usernameInput = control.get<string>('username')?.value;

    // If the username is the same as the current user's username, it is valid
    if (user && user.username === usernameInput) {
      return of(null);
    }

    // Username is required
    if (!usernameInput || usernameInput.trim().length === 0) {
      return of({ usernameRequired: true });
    }

    return of(usernameInput).pipe(
      debounceTime(1000),
      switchMap(() => profileService.usernameExists(usernameInput)),
      map(exists => exists ? { usernameExists: true } : null),
      catchError((error) => {
        console.error('Error validating username:', error);
        return of({ cannotValidateUsername: true });
      })
    );
  };
}
