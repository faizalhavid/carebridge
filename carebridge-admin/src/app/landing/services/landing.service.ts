import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RepositoryRestResource, SuccessResponse } from '@models/dto/responses/server-res';
import { MenuRole } from '@models/menu';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private BASE_URL = 'http://localhost:8080/admin';
  // private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getMenus(): Observable<SuccessResponse<MenuRole[]>> {
    return this.http.get<SuccessResponse<MenuRole[]>>(`${this.BASE_URL}/menu-role/getMenusByRoleId`);
  }

}
