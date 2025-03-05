import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { Vehicle } from '../../../../../core/models/vehicle.model';
import { Fault } from '../../../../../core/models/fault.model';
import { Rental } from '../../../../../core/models/rental.model';
import { MatDialog } from '@angular/material/dialog';
import { AddFaultDialogComponent } from './add-fault-dialog/add-fault-dialog.component';

@Component({
  selector: 'app-vehicle-details',
  standalone: false,
  templateUrl: './vehicle-details.component.html',
  styleUrls: ['./vehicle-details.component.css'],
})
export class VehicleDetailsComponent implements OnInit {
  vehicle: Vehicle | null = null;
  faults: Fault[] = [];
  rentals: Rental[] = [];
  vehicleType: string = '';
  vehicleId: number = 0;
  specificDetails: any = {};

  // Column definitions for the faults table
  faultColumns: string[] = ['description', 'reportedDate', 'actions'];

  // Column definitions for the rentals table
  rentalColumns: string[] = ['startDate', 'endDate', 'totalDuration', 'totalPrice', 'clientName', 'pickUpLocation'];

  constructor(
    private route: ActivatedRoute,
    private vehicleService: VehicleService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.vehicleType = params['vehicleType'];
      this.vehicleId = +params['vehicleId'];
      this.loadVehicleDetails();
      this.loadFaults();
      this.loadRentals();
    });
  }

  loadVehicleDetails(): void {
    switch (this.vehicleType) {
      case 'bike':
        this.vehicleService.getBikeById(this.vehicleId).subscribe((bike) => {
          this.vehicle = bike;
          this.specificDetails = { rangeKm: bike.rangeKm };
        });
        break;
      case 'car':
        this.vehicleService.getCarById(this.vehicleId).subscribe((car) => {
          this.vehicle = car;
          this.specificDetails = { description: car.description };
        });
        break;
      case 'scooter':
        this.vehicleService.getScooterById(this.vehicleId).subscribe((scooter) => {
          this.vehicle = scooter;
          this.specificDetails = { maxSpeedKmh: scooter.maxSpeedKmh };
        });
        break;
      default:
        console.error('Unknown vehicle type');
    }
  }

  loadFaults(): void {
    this.vehicleService.getFaults(this.vehicleId).subscribe((faults) => (this.faults = faults));
  }

  loadRentals(): void {
    this.vehicleService.getRentals(this.vehicleId).subscribe((rentals) => (this.rentals = rentals));
  }

  openAddFaultDialog(): void {
    const dialogRef = this.dialog.open(AddFaultDialogComponent, {
      width: '400px',
      data: { vehicleId: this.vehicleId }, // Pass vehicleId to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.addFault(this.vehicleId, result).subscribe(() => this.loadFaults());
      }
    });
  }

  deleteFault(faultId: number): void {
    this.vehicleService.deleteFault(this.vehicleId, faultId).subscribe(() => this.loadFaults());
  }
}
