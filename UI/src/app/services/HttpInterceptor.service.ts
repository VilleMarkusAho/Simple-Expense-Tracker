import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = environment?.apiUrl || 'http://localhost:5000/api/';
    // withCredentials: true is required for sending cookies
    const apiReq = req.clone({ url: baseUrl + req.url, withCredentials: true });
    return next.handle(apiReq);
  }
}
