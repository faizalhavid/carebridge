import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { LoginResponse } from '../../models/dto/responses/login-res';
import { LoginRequest } from '../../models/dto/requests/login-req';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private BASE_URL = environment.API_URL ;
  private BASE_URL = 'http://localhost:8080/api/v1';
  constructor(private http: HttpClient) { }

  login(req: LoginRequest) {
    return this.http.post<LoginResponse>(`${this.BASE_URL}/auth/login`, req);
  }
}