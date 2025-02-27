import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { VehicleService } from '../../../../../core/services/vehicle.service';

@Component({
  selector: 'app-vehicle-form-dialog',
  standalone: false,
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrls: ['./vehicle-form-dialog.component.css'],
})
export class VehicleFormDialogComponent {
  vehicleForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    public dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleType: string }
  ) {
    this.vehicleForm = this.fb.group({
      model: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      imageUrl: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      ...(this.data.vehicleType === 'bike' && { rangeKm: ['', Validators.required] }),
      ...(this.data.vehicleType === 'car' && { description: ['', Validators.required] }),
      ...(this.data.vehicleType === 'scooter' && { maxSpeedKmh: ['', Validators.required] }),
    });
  }

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const formData = this.vehicleForm.value;
      switch (this.data.vehicleType) {
        case 'bike':
          this.vehicleService.addBike(formData).subscribe(() => this.dialogRef.close(true));
          break;
        case 'car':
          this.vehicleService.addCar(formData).subscribe(() => this.dialogRef.close(true));
          break;
        case 'scooter':
          this.vehicleService.addScooter(formData).subscribe(() => this.dialogRef.close(true));
          break;
      }
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
