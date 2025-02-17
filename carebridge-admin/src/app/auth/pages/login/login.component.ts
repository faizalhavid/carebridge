import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginRequest } from '../../../../models/dto/requests/login-req';
import { DeviceInfo } from '../../../../models/device-info';
import { HttpClient } from '@angular/common/http';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  loginForm: FormGroup;
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
      this.loginForm.disable(); // Disable the form controls
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.loading = false; // Set loading state to false
          this.loginForm.enable(); // Enable the form controls
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.loading = false; // Set loading state to false
          this.loginForm.enable(); // Enable the form controls
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