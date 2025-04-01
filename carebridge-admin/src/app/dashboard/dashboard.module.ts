import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRouteModule } from './dashboard-route.module';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MatIcon } from '@angular/material/icon';
import { DashboardLayout } from './layout/dashboard.component';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { ComponentsModule } from '../../components/components.module';


@NgModule({
  declarations: [
    SidebarComponent,
    DashboardLayout,
    NavbarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    DashboardRouteModule,
    MatIcon
  ]
})
export class DashboardModule { }
