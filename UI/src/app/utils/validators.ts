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
