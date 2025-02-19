import { ChangeDetectionStrategy, Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginRequest } from '../../../../models/dto/requests/login-req';
import { DeviceInfo } from '../../../../models/device-info';
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';
import { MatDialog } from '@angular/material/dialog';
import { DialogContainerComponent } from '../../../../components/Dialog/dialog-container.component';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  @ViewChild('forgotPasswordTemplate') forgotPasswordTemplate!: TemplateRef<any>;

  loginForm: FormGroup;
  forgotPasswordForm: FormGroup;
  deviceInfo: DeviceInfo;
  isLoading = false;
  timerResendOTP = 0;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.loginForm = this.fb.group({
      email: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this.fb.group({
      email: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.email]]
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
      this.isLoading = true;
      this.loginForm.disable();
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response) => {
          console.log('Login successful:', response);
          this.isLoading = false;
          this.loginForm.enable();
        },
        error: (error) => {
          console.error('Login failed:', error);
          this.isLoading = false;
          this.loginForm.enable();
        },
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form Invalid');
    }
  }

  openDialogForgotPassword() {
    console.log('content', this.forgotPasswordTemplate);

    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data: {
        title: 'Forgot Password',
        message: 'Enter your email address to reset your password',
        content: this.forgotPasswordTemplate,
        confirmText: 'Send Email',
        cancelText: 'Cancel',
        isDisabled: this.timerResendOTP > 0
      }
    });

    dialogRef.componentInstance.onConfirm.subscribe((result: any) => {
      // Trigger form submission
      const formElement = document.getElementById('form-forgot-password') as HTMLFormElement;
      if (formElement) {
        formElement.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }

      const isFormValid = this.handleConfirmForgotPassword();
      if (isFormValid) {
        dialogRef.close();
      }
    });

    dialogRef.componentInstance.onCancel.subscribe(() => {
      dialogRef.close();
    });
  }

  handleConfirmForgotPassword(event?: Event) {

    if (this.forgotPasswordForm.invalid) {
      return false;
    }

    this.isLoading = true;
    this.forgotPasswordForm.disable();

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password reset email sent:', response);
        this.isLoading = false;
        this.forgotPasswordForm.enable();
        this.timerResendOTP = Math.floor(Date(response.data).getTime() - Date.now()) / 1000;
      },
      error: (error) => {
        console.error('Error sending reset email:', error);
        this.isLoading = false;
        this.forgotPasswordForm.enable();
      }
    });

    return true;
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