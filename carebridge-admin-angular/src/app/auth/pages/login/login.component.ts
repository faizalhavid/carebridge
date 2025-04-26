import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeviceDetectorService } from 'ngx-device-detector';

import { LoginRequest } from '@models/dto/requests/login-req';
import { DeviceInfo } from '@models/device-info';
import { DialogContainerComponent } from '@components/Dialog/dialog-container.component';
import { ErrorResponse, SuccessResponse } from '@models/dto/responses/server-res';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { AppSnackbarComponent } from '@components/Snackbar/snackbar.component';
import { AuthService } from '../../services/auth.service';

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

  isLoading = signal(false);
  timerResendOTP = signal(0);
  serverResponse = signal<{ [key: string]: string }>({});
  hidePassword = signal(true);

  private _snackBar = inject(MatSnackBar);

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.loginForm = this._fb.group({
      email: [{ value: 'nurfaizal966@gmail.com', disabled: this.isLoading() }, [Validators.required, Validators.email]],
      password: [{ value: 'Barakadut123@', disabled: this.isLoading() }, [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this._fb.group({
      email: [{ value: '', disabled: this.isLoading() }, [Validators.required, Validators.email]]
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

  openSnackBar(message: string, action: string, type: 'success' | 'error' = 'success') {
    this._snackBar.openFromComponent(AppSnackbarComponent, {
      data: {
        message: message,
        action: action,
        panelClass: type === 'success' ? 'alert-success' : 'alert-error',
        actionCallback: () => {
          console.log(`${action} clicked`);
        }
      },
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
    });
  }

  handleLogin() {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response: SuccessResponse) => {
          console.log('Login successful:', response);
          this.isLoading.set(false);
          this.openSnackBar('Login successful', 'Close');
          this.cdr.markForCheck();
        },
        error: (response: ErrorResponse) => {
          this.isLoading.set(false);
          if (response.error && response.error.errors) {
            response.error.errors.forEach((err: { field: string; message: string }) => {
              this.serverResponse.set({ [err.field]: err.message });
              this.loginForm.get(err.field)?.setErrors({ serverError: err.message });
            });

            if (this.serverResponse()['general']) {
              this.openSnackBar(this.serverResponse()['general'], 'Close', 'error');
            } else {
              this.loginForm.setErrors({ 'invalid': true });
            }
          } else {
            console.error('Unexpected error format:', response);
          }
          console.log('serverResponse', this.serverResponse);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
      console.log('Form Invalid');
    }
  }

  openDialogForgotPassword() {
    console.log('content', this.forgotPasswordTemplate);

    const dialogRef = this.dialog.open(DialogContainerComponent, {
      width: '400px',
      data: {
        title: 'Forgot Password',
        message: 'Enter your email address to reset your password',
        content: this.forgotPasswordTemplate,
        confirmText: 'Send Email',
        cancelText: 'Cancel',
        isDisabled: this.timerResendOTP() > 0
      }
    });

    dialogRef.componentInstance.onConfirm.subscribe((result: any) => {
      // Trigger form submission
      const formElement = document.getElementById('form-forgot-password') as HTMLFormElement;
      if (formElement) {
        formElement.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }

      const isFormValid = this.handleConfirmForgotPassword();
      if (!isFormValid) {
        dialogRef.disableClose = true;
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

    this.isLoading.set(true);
    this.forgotPasswordForm.disable();

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password reset email sent:', response);
        this.isLoading.set(false);
        this.forgotPasswordForm.enable();
        this.timerResendOTP.set(Math.floor(new Date(response.data).getTime() - Date.now()) / 1000);
      },
      error: (error) => {
        console.error('Error sending reset email:', error);
        this.isLoading.set(false);
        this.forgotPasswordForm.enable();
      }
    });

    return true;
  }

  togglePassword(event: Event) {
    this.hidePassword.set(!this.hidePassword());
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