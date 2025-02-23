import { ChangeDetectionStrategy, Component, inject, signal, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginRequest } from '../../../../models/dto/requests/login-req';
import { DeviceInfo } from '../../../../models/device-info';
import { HttpClient } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { DialogContainerComponent } from '../../../../components/Dialog/dialog-container.component';
import { ErrorResponse, SuccessResponse } from '../../../../models/dto/responses/server-res';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

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
  serverResponse: { [key: string]: string } = {};
  hidePassword = signal(true);

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private deviceService: DeviceDetectorService,
    private http: HttpClient,
    private dialog: MatDialog
  ) {
    this.loginForm = this._fb.group({
      email: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.email]],
      password: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(6)]]
    });

    this.forgotPasswordForm = this._fb.group({
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


  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    const config = new MatSnackBarConfig();
    config.panelClass = ['custom-class'];
    config.duration = 2000;
    config.direction = 'ltr';
    this._snackBar.open(message, action, config);
  }

  handleLogin() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.loginForm.disable();
      const loginRequest: LoginRequest = {
        ...this.loginForm.value,
        deviceInfo: this.deviceInfo
      };
      this.authService.login(loginRequest).subscribe({
        next: (response: SuccessResponse) => {
          console.log('Login successful:', response);
          this.isLoading = false;
          this.loginForm.enable();
          this.serverResponse = {
            'success': response.message
          }
          this._snackBar.open(response.message, 'Close');
        },
        error: (response: ErrorResponse) => {
          console.error('Login failed:', response);
          console.error('Login failed:', response.error);
          this.isLoading = false;
          this.loginForm.enable();
          if (response.error) {
            response.error.errors.forEach((err: { field: string; message: string }) => {
              console.log('err', err);
              this.serverResponse[err.field] = err.message;
            });
          }
          console.log('serverResponse', this.serverResponse);
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
      width: '400px',
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

    this.isLoading = true;
    this.forgotPasswordForm.disable();

    this.authService.forgotPassword(this.forgotPasswordForm.value).subscribe({
      next: (response) => {
        console.log('Password reset email sent:', response);
        this.isLoading = false;
        this.forgotPasswordForm.enable();
        this.timerResendOTP = Math.floor(new Date(response.data).getTime() - Date.now()) / 1000;
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