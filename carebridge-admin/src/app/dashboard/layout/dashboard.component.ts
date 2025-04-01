import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'; // Import OnInit
import { MenuRole } from '@models/menu';
import { LandingService } from 'src/app/landing/services/landing.service';

@Component({
  standalone: false,
  selector: 'app-dashboard-layout',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardLayout implements OnInit {
  isSidebarOpen: boolean = true;
  menuRoles: MenuRole[] = [];
  activeMenu: string = 'Dashboard';
  activeSubMenu: string = 'Reports';
  activeSubSubMenu: string = 'Monthly Reports';

  constructor(private http: HttpClient, private landingService: LandingService) { }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    this.landingService.getMenus().subscribe({
      next: (res) => {
        this.menuRoles = res._embedded['menuRoles'];
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}