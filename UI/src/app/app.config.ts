import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { HttpInterceptorService } from './services/HttpInterceptor.service';

export const appConfig: ApplicationConfig = {
  providers: [
    HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
