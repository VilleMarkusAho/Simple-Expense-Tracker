import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const baseUrl = environment?.apiUrl || 'http://localhost:5000/';
    const apiReq = req.clone({ url: baseUrl + req.url });
    return next.handle(apiReq);
  }
}
