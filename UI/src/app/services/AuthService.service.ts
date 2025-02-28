import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    const url = "login";
    return this.http.post(url, { username, password });
  }

  isAuthenticated(): Observable<boolean> {
    const url = "isAuthenticated";
    return this.http.get<boolean>(url);
  }
}


