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
  activeMenu: string;
  activeSubMenu: string;


  constructor(private http: HttpClient, private landingService: LandingService) {
    this.activeMenu = window.location.pathname.split('/')[2] || 'Dashboard';
    this.activeSubMenu = window.location.pathname.split('/')[3] || 'Reports';
  }

  ngOnInit(): void {
    this.getMenus();
  }

  getMenus() {
    console.log('test', this.activeMenu, this.activeSubMenu);
    this.landingService.getMenus().subscribe({
      next: (res) => {
        this.menuRoles = res.data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}