import { Component, EventEmitter, Input, Output, TemplateRef, ContentChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';
import { ContentDirective } from './content.directive';

@Component({
  selector: 'app-dialog-button',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.css']
})
export class AppDialogButtonComponent {
  @Input() title: string = 'Dialog title';
  @Input() placeholder: string = 'Dialog placeholder';
  @Input() message: string = 'Dialog message';
  @Input() confirmText: string = 'Confirm';
  @Input() cancelText: string = 'Cancel';
  @Input() disabledButton: boolean = false;
  @Output() onConfirm = new EventEmitter<{ result: any; shouldClose: boolean }>();
  @Output() onCancel = new EventEmitter<void>();
  @ContentChild(ContentDirective, { static: true, read: TemplateRef })
  content!: TemplateRef<any>;

  constructor(private dialog: MatDialog) { }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data: { title: this.title, message: this.message, content: this.content, confirmText: this.confirmText, cancelText: this.cancelText },
      disableClose: true
    });

    dialogRef.componentInstance.onConfirm.subscribe((result: any) => {
      this.onConfirm.emit(result);
      if (result.shouldClose) {
        dialogRef.close();
      }
    });

    dialogRef.componentInstance.onCancel.subscribe(() => {
      this.onCancel.emit();
      dialogRef.close();
    });
  }
}