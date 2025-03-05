import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA, MatDialogTitle, MatDialogContent, MatDialogActions,
} from '@angular/material/dialog';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { VehicleService } from '../../../../../../core/services/vehicle.service';
import { ManufacturerService } from '../../../../../../core/services/manufacturer.service';
import { Manufacturer } from '../../../../../../core/models/manufacturer.model';
import {NgForOf, NgIf, TitleCasePipe} from '@angular/common';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption, MatSelect} from '@angular/material/select';
import {MatInput} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-vehicle-form-dialog',
  templateUrl: './vehicle-form-dialog.component.html',
  styleUrls: ['./vehicle-form-dialog.component.css'],
  imports: [
    MatDialogTitle,
    TitleCasePipe,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatSelect,
    MatOption,
    NgForOf,
    MatInput,
    NgIf,
    MatDialogActions,
    MatButton,
    MatLabel
  ]
})
export class VehicleFormDialogComponent implements OnInit {
  vehicleForm: FormGroup;
  manufacturers: Manufacturer[] = [];

  constructor(
    private fb: FormBuilder,
    private vehicleService: VehicleService,
    private manufacturerService: ManufacturerService,
    public dialogRef: MatDialogRef<VehicleFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { vehicleType: string }
  ) {
    this.vehicleForm = this.fb.group({
      model: ['', Validators.required],
      acquisitionDate: ['', Validators.required],
      purchasePrice: ['', Validators.required],
      imageUrl: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      manufacturerId: ['', Validators.required], // Add manufacturerId to the form
      ...(this.data.vehicleType === 'bike' && { rangeKm: ['', Validators.required] }),
      ...(this.data.vehicleType === 'car' && { description: ['', Validators.required] }),
      ...(this.data.vehicleType === 'scooter' && { maxSpeedKmh: ['', Validators.required] }),
    });
  }

  ngOnInit(): void {
    this.loadManufacturers();
  }

  loadManufacturers(): void {
    this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
      this.manufacturers = manufacturers;
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
