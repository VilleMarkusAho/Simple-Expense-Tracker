import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser, UserForm } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`user/exists/${username}`);
  }

  createUser(user: UserForm): Observable<IUser> {
    return this.http.post<IUser>('user', user);
  }

  updateUser(user: UserForm): Observable<IUser> {
    return this.http.put<IUser>('user', user);
  }

  deleteUser(): Observable<void> {
    return this.http.delete<void>('user');
  }
}
