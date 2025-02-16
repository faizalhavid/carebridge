import { Component } from '@angular/core';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = '';
  password = '';
  showPassword = false;

  login() {
    console.log('Logging in with', this.username, this.password);
  }
  handleConfirmForgotPassword(inputValue: string) {
    console.log('Confirm forgot password with', inputValue);
  }
  togglePassword(event: Event) {
    this.showPassword = !this.showPassword;
    const input = event.target as HTMLInputElement;
    input.type = this.showPassword ? 'text' : 'password';
    console.log('Toggling password visibility', this.showPassword);
  }

}
