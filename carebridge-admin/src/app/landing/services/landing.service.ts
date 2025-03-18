import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MenuRolesResponse } from '@models/dto/responses/menu';
import { RepositoryRestResource } from '@models/dto/responses/server-res';
import { env } from 'process';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient) { }


  getMenus(): Observable<RepositoryRestResource<MenuRolesResponse>> {
    return this.http.get<RepositoryRestResource<MenuRolesResponse>>(`${this.BASE_URL}/menus/roles`);
  }

}
