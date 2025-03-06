export interface IUser {
  userId: number | null | undefined;
  username: string;
  firstName: string;
  lastName: string;
}

export class UserForm implements IUser {

  constructor(user?: IUser | null | undefined) {
    if (user) {
      Object.assign(this, user);
      this.isNewUser = false;
    }
  }

  userId = null;
  username = "";
  firstName = "";
  lastName = "";
  password = "";
  confirmPassword = "";
  isNewUser = true;
}
