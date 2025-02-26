import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './landing-route.module';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LandingLayout } from './layout/landing.component';
import { FooterComponent } from "./shared/footer/footer.component";
import { NavbarComponent } from './shared/navbar/navbar.component';


@NgModule({
  declarations: [
    LandingLayout,
    HomeComponent,
    FooterComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    RouterModule,
  ]
})
export class LayoutModule { }
