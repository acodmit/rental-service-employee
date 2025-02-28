import {Component, OnInit, ViewChild} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { VehicleFormDialogComponent } from '../vehicle-form-dialog/vehicle-form-dialog.component';
import { Bike } from '../../../../../core/models/bike.model';
import { Car } from '../../../../../core/models/car.model';
import { Scooter } from '../../../../../core/models/scooter.model';
import {ConfirmDialogComponent} from '../../../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-vehicle-management',
  templateUrl: './vehicle-management.component.html',
  styleUrls: ['./vehicle-management.component.css'],
  standalone: false,
})
export class VehicleManagementComponent implements OnInit {
  bikes: Bike[] = [];
  cars: Car[] = [];
  scooters: Scooter[] = [];
  selectedTab: string = 'bike'; // Default to the first tab

  @ViewChild('fileInput') fileInput: any; // Reference to the file input element

  constructor(
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadBikes();
    this.loadCars();
    this.loadScooters();
  }

  loadBikes(): void {
    this.vehicleService.getBikes().subscribe((data) => (this.bikes = data));
  }

  loadCars(): void {
    this.vehicleService.getCars().subscribe((data) => (this.cars = data));
  }

  loadScooters(): void {
    this.vehicleService.getScooters().subscribe((data) => (this.scooters = data));
  }

  openAddVehicleDialog(vehicleType: string): void {
    const dialogRef = this.dialog.open(VehicleFormDialogComponent, {
      width: '400px',
      data: { vehicleType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (vehicleType) {
          case 'bike':
            this.loadBikes();
            break;
          case 'car':
            this.loadCars();
            break;
          case 'scooter':
            this.loadScooters();
            break;
        }
      }
    });
  }

  deleteVehicle(vehicleType: string, id: number, vehicleName: string): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
      data: { message: `Are you sure you want to delete ${vehicleName}?` },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        switch (vehicleType) {
          case 'bike':
            this.vehicleService.deleteBike(id).subscribe(() => this.loadBikes());
            break;
          case 'car':
            this.vehicleService.deleteCar(id).subscribe(() => this.loadCars());
            break;
          case 'scooter':
            this.vehicleService.deleteScooter(id).subscribe(() => this.loadScooters());
            break;
        }
      }
    });
  }

  // Handle tab changes
  onTabChange(index: number): void {
    switch (index) {
      case 0:
        this.selectedTab = 'bike';
        break;
      case 1:
        this.selectedTab = 'car';
        break;
      case 2:
        this.selectedTab = 'scooter';
        break;
    }
  }

  // Open the file input dialog
  openFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  // Handle file selection
  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.uploadCSV(file);
    }
  }

  // Upload the CSV file using the VehicleService
  uploadCSV(file: File): void {
    this.vehicleService.uploadCSV(file).subscribe({
      next: (response) => {
        console.log('CSV uploaded successfully', response);
        // Reload the vehicle lists
        this.loadBikes();
        this.loadCars();
        this.loadScooters();
      },
      error: (error) => {
        console.error('Error uploading CSV', error);
      },
    });
  }
}
