import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { HttpClient } from '@angular/common/http';

import { ErrorResponse, SuccessResponse } from '@models/dto/responses/server-res';
import { RegisterResponse } from '@models/dto/responses/register-res';
import { MatchingPasswordValidator } from '@utils/validators/matching-password.validator';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { AppSnackbarComponent } from '@components/Snackbar/snackbar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  standalone: false,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  @ViewChild('stepper') stepper: MatStepper | undefined;

  registerAccountForm: FormGroup;
  verifyAccountForm: FormGroup;
  registerUserDataForm: FormGroup;

  timerResendOTP = signal(0);
  isLoading = signal(false);
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);

  editableFormState = signal({
    registerAccount: true,
    verifyAccount: false,
    registerUserData: false
  });
  serverResponse = signal<{ [key: string]: string }>({});

  private _snackBar = inject(MatSnackBar);

  get formControls() {
    return {
      registerAccount: this.registerAccountForm.controls,
      verifyAccount: this.verifyAccountForm.controls,
      registerUserData: this.registerUserDataForm.controls
    };
  }

  constructor(
    private _fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {
    this.registerAccountForm = this._fb.group({
      email: [{ value: '', disabled: this.isLoading() }, [Validators.required, Validators.email]]
    });

    this.verifyAccountForm = this._fb.group({
      token1: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      token2: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      token3: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      token4: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      token5: ['', [Validators.required, Validators.pattern('^[0-9]$')]],
      token6: ['', [Validators.required, Validators.pattern('^[0-9]$')]]
    });

    this.registerUserDataForm = this._fb.group({
      email: [{ value: this.registerAccountForm.get('email')?.value, disabled: true }],
      token: [{ value: '', disabled: this.isLoading() }, [Validators.required]],
      fullName: [{ value: '', disabled: this.isLoading() }, [Validators.required]],
      mobilePhone: [{ value: '', disabled: this.isLoading() }, [Validators.required, Validators.minLength(12), Validators.maxLength(14), Validators.pattern('^[0-9]{12,14}$')]],
      password: [{ value: '', disabled: this.isLoading() }, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})')]],
      confirmPassword: [{ value: '', disabled: this.isLoading() }, [Validators.required, Validators.minLength(6)], MatchingPasswordValidator.validate],
      imagePath: [{ value: '', disabled: this.isLoading() }]
    });
  }

  ngOnInit() {
    this.registerAccountForm.get('email')?.valueChanges.subscribe(value => {
      this.registerUserDataForm.get('email')?.setValue(value);
    });
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


  handleRegisterAccount() {
    if (this.registerAccountForm.valid) {
      this.isLoading.set(true);
      this.authService.registerEmail(this.registerAccountForm.value).subscribe({
        next: (response: SuccessResponse<RegisterResponse>) => {
          this.isLoading.set(false);
          this.serverResponse.set({ 'success': response.message });
          this.stepper?.next();
          this.serverResponse.set({
            'success': response.message
          });
          this.openSnackBar('A token has been sent to your email', 'Close');
          this.cdr.markForCheck();
          this.editableFormState.update(state => ({ ...state, verifyAccount: true }));
        },
        error: (response: ErrorResponse) => {
          this.isLoading.set(false);
          if (response.error && response.error.errors) {
            response.error.errors.forEach((err: { field: string; message: string }) => {
              this.serverResponse.set({ [err.field]: err.message });
              this.registerAccountForm.get(err.field)?.setErrors({ serverError: err.message });
            });

            if (this.serverResponse()['general']) {
              this.openSnackBar(this.serverResponse()['general'], 'Close', 'error');
            } else {
              this.registerAccountForm.setErrors({ 'invalid': true });
            }
          } else {
            console.error('Unexpected error format:', response);
          }
          console.log('serverResponse', this.serverResponse);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.registerAccountForm.markAllAsTouched();
    }
  }

  handleVerifyAccount() {
    if (this.verifyAccountForm.valid) {
      this.isLoading.set(true);
      const token = `${this.verifyAccountForm.get('token1')?.value}${this.verifyAccountForm.get('token2')?.value}${this.verifyAccountForm.get('token3')?.value}${this.verifyAccountForm.get('token4')?.value}${this.verifyAccountForm.get('token5')?.value}${this.verifyAccountForm.get('token6')?.value}`;
      const email = this.registerAccountForm.get('email')?.value;
      this.authService.verifyAccount({ email, token }).subscribe({
        next: (response: SuccessResponse<any>) => {
          this.isLoading.set(false);
          this.serverResponse.set({ 'success': response.message });
          this.stepper?.next();
          this.editableFormState.update(state => ({ ...state, registerUserData: true }));
          this.editableFormState.update(state => ({ ...state, verifyAccount: false }));
          this.openSnackBar('Account verified successfully', 'Close');
          this.cdr.markForCheck();
        },
        error: (response: ErrorResponse) => {
          this.isLoading.set(false);
          if (response.error && response.error.errors) {
            response.error.errors.forEach((err: { field: string; message: string }) => {
              this.serverResponse.set({ [err.field]: err.message });
              this.verifyAccountForm.get(err.field)?.setErrors({ serverError: err.message });
            });

            if (this.serverResponse()['general']) {
              this.openSnackBar(this.serverResponse()['general'], 'Close', 'error');
            } else {
              this.verifyAccountForm.setErrors({ 'invalid': true });
            }
          }
          else {
            console.error('Unexpected error format:', response);
          }
          console.log('serverResponse', this.serverResponse);
          this.cdr.markForCheck();
        }
      });
    } else {
      this.verifyAccountForm.markAllAsTouched();
    }
  }

  handleRegisterUserData() {
    if (this.registerUserDataForm.valid) {
      this.isLoading.set(true);
      this.authService.registerUserData(this.registerUserDataForm.value).subscribe({
        next: (response: SuccessResponse<any>) => {
          this.isLoading.set(false);
          this.serverResponse.set({ 'success': response.message });
          this.openSnackBar('Account created successfully', 'Close');
          this.cdr.markForCheck();
          this.dialog.closeAll();
          window.location.pathname = '/auth/login';
        },
        error: (response: ErrorResponse) => {
          this.isLoading.set(false);
          if (response.error && response.error.errors) {
            response.error.errors.forEach((err: { field: string; message: string }) => {
              this.serverResponse.set({ [err.field]: err.message });
              this.registerUserDataForm.get(err.field)?.setErrors({ serverError: err.message });
            });

            if (this.serverResponse()['general']) {
              this.openSnackBar(this.serverResponse()['general'], 'Close', 'error');
            } else {
              this.registerUserDataForm.setErrors({ 'invalid': true });
            }
          } else {
            console.error('Unexpected error format:', response);
          }
          console.log('serverResponse', this.serverResponse);
          this.cdr.markForCheck();

        }
      });
    } else {
      this.registerUserDataForm.markAllAsTouched();
    }
  }

  hidePasswordToggle(event: Event, type: string = 'password') {
    if (type === 'password') {
      this.hidePassword.set(!this.hidePassword());
    } else {
      this.hideConfirmPassword.set(!this.hideConfirmPassword());
    }
    event.stopPropagation();
  }

  moveToNext(event: Event, nextControlName: string) {
    const input = event.target as HTMLInputElement;
    if (input.value.length === 1) {
      const nextControl = this.verifyAccountForm.get(nextControlName);
      if (nextControl) {
        const nextInput = document.querySelector(`input[formControlName="${nextControlName}"]`) as HTMLInputElement;
        if (nextInput) {
          nextInput.focus();
        }
      }
    }
  }
}