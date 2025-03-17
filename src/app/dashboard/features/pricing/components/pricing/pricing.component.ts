import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { Vehicle } from '../../../../../core/models/vehicle.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-pricing',
  standalone: false,
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent implements OnInit {
  vehicles: Vehicle[] = []; // List of vehicles
  isLoading: boolean = true; // Loading state

  constructor(private vehicleService: VehicleService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadVehicles();
  }

  // Fetch all vehicles
  loadVehicles(): void {
    this.vehicleService.getVehicles().subscribe({
      next: (vehicles) => {
        this.vehicles = vehicles;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Failed to load vehicles:', err);
        this.isLoading = false;
      },
    });
  }

  updateHourlyRate(vehicle: Vehicle): void {
    const updateData = { hourlyRate: vehicle.hourlyRate };
    this.vehicleService.updateVehicle(vehicle.id, updateData).subscribe({
      next: () => {
        this.snackBar.open('Hourly rate updated successfully!', 'Close', {
          duration: 3000,
        });
      },
      error: (err) => {
        console.error('Failed to update hourly rate:', err);
        this.snackBar.open('Failed to update hourly rate. Please try again.', 'Close', {
          duration: 3000,
        });
      },
    });
  }
}
