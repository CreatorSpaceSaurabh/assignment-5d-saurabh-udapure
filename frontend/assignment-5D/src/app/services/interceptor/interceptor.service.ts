import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (window.localStorage.getItem('userData')) {
      const token = JSON.parse(localStorage.getItem('userData')).token;
      request = request.clone({
        setHeaders: {
          Authorization: `${token}`,
        }
      });
    }
    return next.handle(request);
  }
}
