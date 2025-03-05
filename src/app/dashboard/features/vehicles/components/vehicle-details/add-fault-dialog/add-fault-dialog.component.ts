import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatButton} from '@angular/material/button';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-add-fault-dialog',
  templateUrl: './add-fault-dialog.component.html',
  imports: [
    MatLabel,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatDialogActions,
    MatButton,
    MatInput
  ]
})
export class AddFaultDialogComponent {
  faultForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddFaultDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleId: number } // Inject vehicleId
  ) {
    this.faultForm = this.fb.group({
      description: ['', Validators.required],
      reportedDate: [new Date().toISOString(), Validators.required], // Add reportedDate
    });
  }

  onSave(): void {
    if (this.faultForm.valid) {
      const payload = {
        ...this.faultForm.value,
        vehicleId: this.data.vehicleId, // Include vehicleId in the payload
      };
      this.dialogRef.close(payload);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
