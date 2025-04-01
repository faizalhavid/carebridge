import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LandingLayout } from '../landing/layout/landing.component';
import { HomeComponent } from './pages/home/home.component';
import { DashboardLayout } from './layout/dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: DashboardLayout,
    children: [
      { path: '', component: HomeComponent },
      { path: '**', redirectTo: '/dashboard' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRouteModule { }