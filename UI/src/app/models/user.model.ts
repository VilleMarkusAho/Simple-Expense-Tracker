export interface IUser {
  userId?: number;
  username: string;
  firstName: string;
  lastName: string;
}

export class UserForm implements IUser {

  constructor(user?: IUser | null | undefined) {
    if (user) {
      Object.assign(this, user);
      this.confirmPassword = this.password;
      this.isNewUser = false;
    }
  }

  username: string = "";
  firstName: string = "";
  lastName: string = "";
  password: string = "";
  confirmPassword: string = "";
  readonly isNewUser: boolean = true;
}
