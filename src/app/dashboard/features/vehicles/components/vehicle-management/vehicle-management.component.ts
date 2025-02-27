import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { VehicleFormDialogComponent } from '../vehicle-form-dialog/vehicle-form-dialog.component';
import { Bike } from '../../../../../core/models/bike.model';
import { Car } from '../../../../../core/models/car.model';
import { Scooter } from '../../../../../core/models/scooter.model';

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

  constructor(private vehicleService: VehicleService, private dialog: MatDialog) {}

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
        // Reload the appropriate list based on the vehicle type
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

  deleteVehicle(vehicleType: string, id: number): void {
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
}
