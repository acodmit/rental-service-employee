import { Component, Inject, OnInit } from '@angular/core';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { Vehicle } from '../../../../../core/models/vehicle.model';

@Component({
  selector: 'app-add-fault-dialog',
  standalone: false,
  templateUrl: './add-fault-dialog.component.html',
  styleUrls: ['./add-fault-dialog.component.css'],
})
export class AddFaultDialogComponent implements OnInit {
  faultForm: FormGroup;
  vehicles: Vehicle[] = []; // List of vehicles to select from

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<AddFaultDialogComponent>,
    private vehicleService: VehicleService,
    @Inject(MAT_DIALOG_DATA) public data: any // Optional data passed to the dialog
  ) {
    this.faultForm = this.fb.group({
      description: ['', Validators.required], // Fault description
      vehicleId: ['', Validators.required], // Selected vehicle ID
    });
  }

  ngOnInit(): void {
    this.loadVehicles(); // Load vehicles when the dialog is initialized
  }

  // Load all vehicles for the dropdown
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe((vehicles) => {
      this.vehicles = vehicles;
    });
  }

  // Save the fault and close the dialog
  onSave(): void {
    if (this.faultForm.valid) {
      const payload = {
        ...this.faultForm.value,
        reportedDate: new Date().toISOString(), // Add reported date
      };
      this.dialogRef.close(payload);
    }
  }

  // Close the dialog without saving
  onCancel(): void {
    this.dialogRef.close();
  }
}
