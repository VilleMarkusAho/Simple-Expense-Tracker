import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  usernameExists(username: string): Observable<boolean> {
    return this.http.get<boolean>(`user/exists/${username}`);
  }
}
