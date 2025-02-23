import { ChangeDetectionStrategy, Component, OnInit, signal, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { SuccessResponse } from '../../../../models/dto/responses/server-res';
import { RegisterResponse } from '../../../../models/dto/responses/register-res';

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
  timerResendOTP = 0;
  isLoading = false;
  isLinear = true;
  hidePassword = signal(true);
  hideConfirmPassword = signal(true);
  disabledFormState = {
    registerAccount: false,
    verifyAccount: false,
    registerUserData: true
  }
  editableFormState = {
    registerAccount: true,
    verifyAccount: true,
    registerUserData: false
  }
  serverResponse: { [key: string]: string } = {};

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
    private http: HttpClient
  ) {
    this.registerAccountForm = this._fb.group({
      email: [{ value: '', disabled: this.isLoading || this.disabledFormState.registerAccount }, [Validators.required, Validators.email]]
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
      token: [{ value: '', disabled: this.isLoading }, [Validators.required]],
      fullName: [{ value: '', disabled: this.isLoading }, [Validators.required]],
      mobilePhone: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(12), Validators.maxLength(14), Validators.pattern('^[0-9]{12,14}$')]],
      password: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(6), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})')]],
      confirmPassword: [{ value: '', disabled: this.isLoading }, [Validators.required, Validators.minLength(6)], this.passwordMatchValidator],
      imagePath: [{ value: '', disabled: this.isLoading }]
    });
  }

  ngOnInit() {
    this.registerAccountForm.get('email')?.valueChanges.subscribe(value => {
      this.registerUserDataForm.get('email')?.setValue(value);
    });
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.get('password')?.value;
    const confirmPassword = formGroup.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { mismatch: true };
  }

  handleRegisterAccount() {
    if (this.registerAccountForm.valid) {
      this.isLoading = true;
      this.authService.registerEmail(this.registerAccountForm.value).subscribe({
        next: (response: SuccessResponse<RegisterResponse>) => {
          this.isLoading = false;
          this.serverResponse = {
            'success': response.message,
          }
          this.stepper?.next();
          this.editableFormState.verifyAccount = true;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error registering account:', error);
        }
      });
    } else {
      this.registerAccountForm.markAllAsTouched();
    }
  }

  handleVerifyAccount() {
    if (this.verifyAccountForm.valid) {
      this.isLoading = true;
      const token = `${this.verifyAccountForm.get('token1')?.value}${this.verifyAccountForm.get('token2')?.value}${this.verifyAccountForm.get('token3')?.value}${this.verifyAccountForm.get('token4')?.value}${this.verifyAccountForm.get('token5')?.value}${this.verifyAccountForm.get('token6')?.value}`;
      const email = this.registerAccountForm.get('email')?.value
      this.authService.verifyAccount({ email, token }).subscribe({
        next: (response: SuccessResponse<any>) => {
          this.isLoading = false;
          this.serverResponse = {
            'success': response.message,
          }
          this.stepper?.next();
          this.editableFormState.registerUserData = true;
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error verifying account:', error);
        }
      });
    } else {
      this.verifyAccountForm.markAllAsTouched();
    }
  }

  handleRegisterUserData() {
    if (this.registerUserDataForm.valid) {
      this.isLoading = true;
      this.authService.registerUserData(this.registerUserDataForm.value).subscribe({
        next: (response: SuccessResponse<any>) => {
          this.isLoading = false;
          this.serverResponse = {
            'success': response.message,
          }
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error registering user data:', error);
        }
      });
    } else {
      this.registerUserDataForm.markAllAsTouched();
    }
  }

  hidePasswordToggle(event: Event, type: string = 'password') {
    if (type === 'password') {
      this.hidePassword = signal(!this.hidePassword());
    } else {
      this.hideConfirmPassword = signal(!this.hideConfirmPassword());
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