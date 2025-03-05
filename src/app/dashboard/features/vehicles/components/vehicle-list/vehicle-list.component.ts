// vehicle-list.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { Bike } from '../../../../../core/models/bike.model';
import { Car } from '../../../../../core/models/car.model';
import { Scooter } from '../../../../../core/models/scooter.model';

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  bikes: Bike[] = [];
  cars: Car[] = [];
  scooters: Scooter[] = [];

  // Column definitions for the tables
  bikeColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'rangeKm', 'isBroken', 'actions'];
  carColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'description', 'isBroken', 'actions'];
  scooterColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'maxSpeedKmh', 'isBroken', 'actions'];

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBikes();
    this.loadCars();
    this.loadScooters();
  }

  loadBikes(): void {
    this.vehicleService.getBikes().subscribe((bikes) => {
      this.bikes = bikes;
    });
  }

  loadCars(): void {
    this.vehicleService.getCars().subscribe((cars) => {
      this.cars = cars;
    });
  }

  loadScooters(): void {
    this.vehicleService.getScooters().subscribe((scooters) => {
      this.scooters = scooters;
    });
  }

  viewVehicleDetails(vehicleId: number, vehicleType: string): void {
    this.router.navigate(['/dashboard/vehicles/vehicle-details', vehicleType, vehicleId])
      .then(r => console.log(r));
  }
}
