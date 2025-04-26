import { Component, Input, SimpleChanges } from '@angular/core';
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
  public currentMenu: string = window.location.pathname.split('/')[1] || 'Dashbard';
  public currentSubMenu: string = window.location.pathname.split('/')[2] || 'Reports';
  public currentSubSubMenu: string = window.location.pathname.split('/')[3] || 'Monthly Reports';

  constructor() {
    console.log(this.currentMenu, this.currentSubMenu, this.currentSubSubMenu);
  }





  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  onclickMenu(menu: any) {
    this.activeMenu = menu;
  }

}