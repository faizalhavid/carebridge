import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginRequest } from '../../../models/dto/requests/login-req';
import { LoginResponse } from '../../../models/dto/responses/login-res';
import { SuccessResponse } from '../../../models/dto/responses/server-res';
import { Observable } from 'rxjs/internal/Observable';
import { RegisterRequest } from '../../../models/dto/requests/register-req';
import { RegisterResponse } from '../../../models/dto/responses/register-res';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private BASE_URL = environment.API_URL ;
  private BASE_URL = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  login(req: LoginRequest): Observable<SuccessResponse<LoginResponse>> {
    return this.http.post<SuccessResponse<LoginResponse>>(`${this.BASE_URL}/auth/login`, req);
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
}