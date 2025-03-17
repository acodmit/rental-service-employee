// vehicle-list.component.ts
import { Component, OnInit, ViewChild, ContentChild, ElementRef} from '@angular/core';
import { Router } from '@angular/router';
import { VehicleService } from '../../../../../core/services/vehicle.service';
import { Bike } from '../../../../../core/models/bike.model';
import { Car } from '../../../../../core/models/car.model';
import { Scooter } from '../../../../../core/models/scooter.model';
import {
  MatTableDataSource
} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-vehicle-list',
  standalone: false,
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css'],
})
export class VehicleListComponent implements OnInit {
  // Data sources for tables
  bikeDataSource = new MatTableDataSource<Bike>();
  carDataSource = new MatTableDataSource<Car>();
  scooterDataSource = new MatTableDataSource<Scooter>();

  // Search terms
  bikeSearchTerm: string = '';
  carSearchTerm: string = '';
  scooterSearchTerm: string = '';

  // Column definitions
  bikeColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'rangeKm', 'isBroken', 'actions'];
  carColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'description', 'isBroken', 'actions'];
  scooterColumns: string[] = ['model', 'manufacturer', 'acquisitionDate', 'hourlyRate', 'maxSpeedKmh', 'isBroken', 'actions'];

  // Paginators
  @ViewChild('bikePaginator') bikePaginator!: MatPaginator;
  @ViewChild('carPaginator') carPaginator!: MatPaginator;
  @ViewChild('scooterPaginator') scooterPaginator!: MatPaginator;

  constructor(
    private vehicleService: VehicleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBikes();
    this.loadCars();
    this.loadScooters();
  }

  ngAfterViewInit(): void {
    // Connect paginators to data sources
    this.bikeDataSource.paginator = this.bikePaginator;
    this.carDataSource.paginator = this.carPaginator;
    this.scooterDataSource.paginator = this.scooterPaginator;
  }

  loadBikes(): void {
    this.vehicleService.getBikes().subscribe((bikes) => {
      this.bikeDataSource.data = bikes;
      if (this.bikePaginator) {
        this.bikeDataSource.paginator = this.bikePaginator; // Reconnect paginator
      }
    });
  }

  loadCars(): void {
    this.vehicleService.getCars().subscribe((cars) => {
      this.carDataSource.data = cars;
      if (this.carPaginator) {
        this.carDataSource.paginator = this.carPaginator; // Reconnect paginator
      }
    });
  }

  loadScooters(): void {
    this.vehicleService.getScooters().subscribe((scooters) => {
      this.scooterDataSource.data = scooters;
      if (this.scooterPaginator) {
        this.scooterDataSource.paginator = this.scooterPaginator; // Reconnect paginator
      }
    });
  }

  // Apply search filter for bikes
  applyBikeFilter(): void {
    this.bikeDataSource.filter = this.bikeSearchTerm.trim().toLowerCase();
  }

  // Apply search filter for cars
  applyCarFilter(): void {
    this.carDataSource.filter = this.carSearchTerm.trim().toLowerCase();
  }

  // Apply search filter for scooters
  applyScooterFilter(): void {
    this.scooterDataSource.filter = this.scooterSearchTerm.trim().toLowerCase();
  }

  viewVehicleDetails(vehicleId: number, vehicleType: string): void {
    this.router.navigate(['/dashboard/vehicles/vehicle-details', vehicleType, vehicleId]);
  }
}
