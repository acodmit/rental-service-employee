import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { RentalService } from '../../../../../core/services/rental.service';
import { Rental } from '../../../../../core/models/rental.model';

@Component({
  selector: 'app-rental-overview',
  standalone: false,
  templateUrl: './rental-overview.component.html',
  styleUrls: ['./rental-overview.component.css'],
})
export class RentalOverviewComponent implements OnInit {
  // Data source for the table
  rentalDataSource = new MatTableDataSource<Rental>();

  // Search term
  searchTerm: string = '';

  // Column definitions
  columns: string[] = [
    'id',
    'startDate',
    'endDate',
    'totalDurationMinutes',
    'totalPrice',
    'vehicle',
    'client',
    'pickUpLocation',
    'dropOffLocation',
  ];

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private rentalService: RentalService) {}

  ngOnInit(): void {
    this.loadRentals();
  }

  ngAfterViewInit(): void {
    // Connect paginator to data source
    this.rentalDataSource.paginator = this.paginator;

    // Customize filter predicate to search across all columns
    this.rentalDataSource.filterPredicate = this.createFilterPredicate();
  }

  // Load all rentals
  loadRentals(): void {
    this.rentalService.getRentals().subscribe((data) => {
      this.rentalDataSource.data = data;
      if (this.paginator) {
        this.rentalDataSource.paginator = this.paginator; // Reconnect paginator
      }
    });
  }

  // Apply search filter
  applyFilter(): void {
    this.rentalDataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  // Custom filter predicate to search across all columns
  private createFilterPredicate(): (data: Rental, filter: string) => boolean {
    return (data: Rental, filter: string): boolean => {
      // Convert all column data to a single string
      const dataStr = Object.keys(data)
        .reduce((currentTerm: string, key: string) => {
          // Handle nested objects (e.g., vehicle, client, locations)
          if (key === 'vehicle') {
            return (
              currentTerm +
              data[key].model +
              data[key].manufacturer.name +
              ' '
            );
          } else if (key === 'client') {
            return (
              currentTerm +
              data[key].firstName +
              data[key].lastName +
              data[key].email +
              ' '
            );
          } else if (key === 'pickUpLocation' || key === 'dropOffLocation') {
            return (
              currentTerm +
              data[key].latitude +
              data[key].longitude +
              ' '
            );
          } else {
            return currentTerm + (data as any)[key] + ' ';
          }
        }, '')
        .toLowerCase();

      // Check if the filter string is found in the data string
      return dataStr.indexOf(filter) !== -1;
    };
  }
}
