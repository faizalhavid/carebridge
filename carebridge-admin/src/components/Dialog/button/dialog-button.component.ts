import { Component, EventEmitter, inject, Input, Output, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DialogContainerComponent } from '../dialog-container/dialog-container.component';

@Component({
  selector: 'app-dialog-button',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
  ],
  templateUrl: './dialog-button.component.html',
  styleUrls: ['./dialog-button.component.css']
})
export class AppDialogButtonComponent implements AfterViewInit {
  @Input() title: string = 'Dialog title';
  @Input() placeholder: string = 'Dialog placeholder';
  @Input() message: string = 'Dialog message';
  @Input() disabled: boolean = false;
  @Output() onConfirm = new EventEmitter<string>();
  @Output() onCancel = new EventEmitter<void>();
  @ViewChild('content', { read: TemplateRef }) content!: TemplateRef<any>;
  readonly dialog = inject(MatDialog);

  private contentTemplate!: TemplateRef<any>;

  ngAfterViewInit() {
    this.contentTemplate = this.content;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogContainerComponent, {
      data: {
        title: this.title,
        message: this.message,
        content: this.contentTemplate
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.onConfirm.emit(result);
      } else {
        this.onCancel.emit();
      }
      console.log(`Dialog result: ${result}`);
    });
  }

  onCancelClick() {
    if (this.onCancel.observers.length > 0) {
      this.onCancel.emit();
    }
  }

  onConfirmClick() {
    this.onConfirm.emit();
  }
}