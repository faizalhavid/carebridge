import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('access_token');

    const excludedUrls = [
      '/auth',
      '/guest'
    ];

    const shouldExclude = excludedUrls.some(url => req.url.includes(url));

    if (token && !shouldExclude) {
      const clonedReq = req.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      });
      return next.handle(clonedReq);
    }

    return next.handle(req);
  }
}