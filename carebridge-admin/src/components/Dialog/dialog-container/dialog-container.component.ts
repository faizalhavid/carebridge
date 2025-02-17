// filepath: /c:/Users/900902/Documents/Github/carebridge/carebridge-admin/src/components/Dialog/dialog-container/dialog-container.component.ts
import { Component, Inject, ViewChild, ViewContainerRef, AfterViewInit, TemplateRef } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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
  ],
  templateUrl: './dialog-container.component.html',
  styleUrls: ['./dialog-container.component.css']
})
export class DialogContainerComponent implements AfterViewInit {
  @ViewChild('dynamicContent', { read: ViewContainerRef }) dynamicContent!: ViewContainerRef;

  constructor(
    public dialogRef: MatDialogRef<DialogContainerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string; content: TemplateRef<any> }
  ) { }

  ngAfterViewInit() {
    if (this.data.content) {
      this.dynamicContent.createEmbeddedView(this.data.content);
    }
  }

  onCancelClick(): void {
    console.log('data :', this.data)
    this.dialogRef.close();
  }

  onConfirmClick(): void {
    this.dialogRef.close();
  }
}