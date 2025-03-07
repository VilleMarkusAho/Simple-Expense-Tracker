import { AbstractControl, AsyncValidator, AsyncValidatorFn, ValidationErrors, ValidatorFn } from '@angular/forms';
import { ProfileService } from '../services/profile-service.service';
import { catchError, debounce, debounceTime, distinctUntilChanged, map, Observable, of, switchMap, tap, timer } from 'rxjs';
import { IUser } from '../models/user.model';

export function matchPasswords(control: AbstractControl): ValidationErrors | null {
  const password = control.get<string>('password')?.value;
  const confirmPassword = control.get<string>('confirmPassword')?.value;

  // Confirm password is optional, until the password is entered
  if (password && password !== confirmPassword) {
    return { passwordsDoNotMatch: true };
  }

  return null;
}

export function validatePassword(control: AbstractControl): ValidationErrors | null {
  const password = control.value as string;
  let errors: any = {};

  // Password is optional, until the password is entered
  if (!password) {
    return null;
  }

  if (password.length < 8) {
    errors["passwordTooShort"] = true;
  }

  if (password.length > 36) {
    errors["passwordTooLong"] = true;
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
    const user = JSON.parse(localStorage.getItem('user') as string) as IUser | null;
    const usernameInput = control.value as string;

    if (control.pristine) {
      return of(null);
    }

    // Username is required
    if (!usernameInput || usernameInput.trim().length === 0) {
      return of({ usernameRequired: true });
    }

    // If the username is the same as the current user's username, it is valid
    if (user?.username === usernameInput) {
      return of(null);
    }

    if (usernameInput.length > 20) {
      return of({ usernameTooLong: true });
    }

    return timer(500).pipe(
      switchMap(() => profileService.usernameExists(usernameInput)),
      map(isUserNameTaken => isUserNameTaken ? { usernameTaken: true } : null),
      catchError(() => of({ cannotValidateUsername: true }))
    );
  };
};

