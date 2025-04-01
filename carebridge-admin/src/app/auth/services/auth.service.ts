import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../../models/dto/requests/login-req';
import { LoginResponse } from '../../../models/dto/responses/login-res';
import { SuccessResponse } from '../../../models/dto/responses/server-res';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterRequest } from '../../../models/dto/requests/register-req';
import { RegisterResponse } from '../../../models/dto/responses/register-res';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private BASE_URL = environment.apiUrl;
  constructor(private http: HttpClient) { }

  login(req: LoginRequest): Observable<SuccessResponse<LoginResponse>> {
    return this.http.post<SuccessResponse<LoginResponse>>(`${this.BASE_URL}/auth/login`, req).pipe(
      tap((res) => {
        if (res.status === 200) {
          localStorage.setItem('access_token', res.data.token.accessToken);
          console.log(res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));
          window.location.pathname = '/dashboard';
        }
      }
      )
    );
  }

  registerEmail(email: string) {
    return this.http.post<SuccessResponse<RegisterResponse>>(`${this.BASE_URL}/auth/register-email`, email);
  }

  registerUserData(req: RegisterRequest) {
    return this.http.post<SuccessResponse<RegisterResponse>>(`${this.BASE_URL}/auth/register-user`, req);
  }

  forgotPassword(req: { email: string }) {
    return this.http.post<any>(`${this.BASE_URL}/auth/forgot-password`, req);
  }

  verifyAccount(req: { email: string, token: string }) {
    return this.http.post<any>(`${this.BASE_URL}/auth/verify-account`, req);
  }

  refreshAccessToken(req: { refreshToken: string }) {
    return this.http.post<any>(`${this.BASE_URL}/auth/refresh-token`, req);
  }

  validateToken(req: { token: string }) {
    return this.http.post<any>(`${this.BASE_URL}/auth/validate-token`, req);
  }


}