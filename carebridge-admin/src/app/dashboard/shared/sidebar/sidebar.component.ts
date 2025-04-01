import { Component, Input } from '@angular/core';
import { MenuRole } from '@models/menu';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() isSidebarOpen: boolean = true;
  @Input() isMobile: boolean = false;
  @Input() isTablet: boolean = false;
  @Input() menus: MenuRole[] = [];
  @Input() activeMenu: string = '';
  @Input() activeSubMenu: string = '';
  @Input() activeSubSubMenu: string = '';

  constructor() { }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}