import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isNavbarOpen = false;
  title: any;

  toggleNavbar() {
    this.isNavbarOpen = !this.isNavbarOpen;
  }
}