import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-snackbar',
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatButtonModule
  ],
  template: `
    <div [className]="data.panelClass">
      <span>{{ data.message }}</span>
      <button mat-button (click)="action()">{{ data.action }}</button>
    </div>
  `,
  styles: [`
    .alert-success { @apply bg-green-500 text-white flex justify-between; }
    .alert-error { @apply bg-red-500 text-white flex justify-between; }
  `]
})
export class AppSnackbarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  action() {
    if (this.data.actionCallback) {
      this.data.actionCallback();
    }
  }
}