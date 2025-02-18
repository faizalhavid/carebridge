import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginRequest } from '../../../../models/dto/requests/login-req';
import { DeviceInfo } from '../../../../models/device-info';
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  deviceInfo: DeviceInfo;
  loading = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient
  ) {
    this.loginForm = this.fb.group({
      email: [{ value: '', disabled: this.loading }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.loading }, [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: [{ value: '', disabled: this.loading }, [Validators.required, Validators.email]]
    });

    const deviceInfo = this.deviceService.getDeviceInfo();
    this.deviceInfo = {
      operatingSystem: deviceInfo.os,
      osVersion: deviceInfo.os_version,
      browser: deviceInfo.browser,
      browserVersion: deviceInfo.browser_version,
      deviceToken: '',
      ipAddress: '',
      deviceType: deviceInfo.browser ? 'Browser' : 'Mobile',
    };

    this.getIpAddress();
  }

  hide = signal(true);

  login() {
    if (this.loginForm.valid) {
      this.loading = true;
      this.loginForm.disable();
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.loading = false;
          this.loginForm.enable();
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loading = false;
          this.loginForm.enable();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form Invalid');
    }
  }

  handleConfirmForgotPassword() {
    this.forgotPasswordForm.markAllAsTouched();
    this.loading = true;
    this.forgotPasswordForm.disable();

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password reset email sent:', response);
        this.loading = false;
        this.forgotPasswordForm.enable();
      },
      error: (error) => {
        console.error('Error sending reset email:', error);
        this.loading = false;
        this.forgotPasswordForm.enable();
      }
    });
  }

  handleOnSubmit(event: Event) {
    event.preventDefault();
    console.log('Form submitted');
    if (this.forgotPasswordForm.valid) {
      this.handleConfirmForgotPassword();
    }
  }

  togglePassword(event: Event) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  // Getters
  get f() {
    return this.loginForm.controls;
  }

  private getIpAddress() {
    this.http.get<{ ip: string }>('https://api.ipify.org?format=json').subscribe({
      next: (response) => {
        this.deviceInfo.ipAddress = response.ip;
      },
      error: (error) => {
        console.error('Failed to get IP address:', error);
      }
    });
  }
}