import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from './LocalStorage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ message: string, result: object }>("login", { username, password });
  }

  logout(): void {
    this.localStorage.clear();
    this.http.get("logout").subscribe();
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): Observable<boolean> {
    const url = "authorization/status";
    return this.http.get<boolean>(url);
  }
}


