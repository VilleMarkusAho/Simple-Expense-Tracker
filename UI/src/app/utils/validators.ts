import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

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
