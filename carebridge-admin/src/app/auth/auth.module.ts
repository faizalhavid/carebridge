import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthRoutingModule } from './auth-route.module';
import { LoginComponent } from './pages/login/login.component';
import { AuthLayout } from './layout/auth.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from '@angular/material/form-field';
import { RegisterComponent } from './pages/register/register.component';
import { DeviceDetectorService } from 'ngx-device-detector';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DialogContainerComponent } from '../../components/Dialog/dialog-container.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    AuthLayout
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    MatSlideToggleModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDividerModule, MatIconModule, MatProgressSpinnerModule,
    MatProgressBarModule,
    DialogContainerComponent,
    ReactiveFormsModule,
    MatStepperModule,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'outline' } },
    provideHttpClient(),
    DeviceDetectorService,
  ]
})
export class AuthModule { }