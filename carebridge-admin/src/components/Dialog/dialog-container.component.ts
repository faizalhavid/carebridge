import { Component, Inject, ViewChild, ViewContainerRef, AfterViewInit, TemplateRef, EventEmitter, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { log } from 'node:console';

@Component({
  selector: 'app-dialog-container',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.scss']
})
export class DialogContainerComponent implements AfterViewInit {
  @ViewChild('content', { read: ViewContainerRef }) contentContainer!: ViewContainerRef;
  @Output() onConfirm = new EventEmitter<void>();
  @Output() onCancel = new EventEmitter<void>();


  constructor(
    public dialogRef: MatDialogRef<DialogContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; content: TemplateRef<unknown>; confirmText: string; cancelText: string; isDisabled: boolean }
  ) { }

  ngAfterViewInit() {
    if (this.data.content) {
      this.contentContainer.clear();
      this.contentContainer.createEmbeddedView(this.data.content);
    }
  }

  onCancelClick(): void {
    this.onCancel.emit();
  }

  onConfirmClick(): void {
    console.log('data', this.data);
    this.onConfirm.emit();
  }
}