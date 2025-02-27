import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './landing-route.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingLayout } from './layout/landing.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from './shared/navbar/navbar.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    LandingLayout,
    HomeComponent,
    FooterComponent,
    NavbarComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
    MatToolbarModule, MatButtonModule, MatIconModule, MatCardModule
  ]
})
export class LayoutModule { }
