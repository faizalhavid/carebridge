import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginRequest } from '../../../models/dto/requests/login-req';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DeviceInfo } from '../../../models/device-info';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  deviceInfo: DeviceInfo;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private deviceService: DeviceDetectorService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo = {
      deviceType: deviceInfo.device,
      operatingSystem: deviceInfo.os,
      osVersion: deviceInfo.os_version,
      browser: deviceInfo.browser,
      browserVersion: deviceInfo.browser_version,
      deviceToken: '',
      ipAddress: ''
    };
  }

  hide = signal(true);

  login() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
        },
        error: (error) => {
          console.error('Login failed:', error);
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form Invalid');
    }
  }

  handleConfirmForgotPassword(inputValue: string) {
    console.log('Confirm forgot password with', inputValue);
  }

  togglePassword(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Getters
  get f() {
    return this.loginForm.controls;
  }
}