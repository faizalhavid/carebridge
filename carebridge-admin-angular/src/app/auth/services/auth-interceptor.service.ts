import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export const authInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('access_token');
  }

  const excludedUrls = [
    '/auth',
    '/guest'
  ];

  const shouldExclude = excludedUrls.some(url => req.url.includes(url));

  if (token && !shouldExclude) {
    const clonedReq = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(clonedReq).pipe(
      catchError((error: HttpErrorResponse) => handleError(error, router))
    );
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => handleError(error, router))
  );
};

function handleError(error: HttpErrorResponse, router: Router): Observable<never> {
  if (error.status === 403) {
    if (isPlatformBrowser(inject(PLATFORM_ID))) {
      localStorage.removeItem('access_token');
    }
    router.navigate(['/auth/login']);
  }
  return throwError(() => error);
}