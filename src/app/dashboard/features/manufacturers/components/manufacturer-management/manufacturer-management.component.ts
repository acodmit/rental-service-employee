import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ManufacturerService } from '../../../../../core/services/manufacturer.service';
import { Manufacturer } from '../../../../../core/models/manufacturer.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ManufacturerDialogComponent } from '../manufacturer-dialog/manufacturer-dialog.component';

@Component({
  selector: 'app-manufacturer-management',
  standalone: false,
  templateUrl: './manufacturer-management.component.html',
  styleUrls: ['./manufacturer-management.component.css'],
})
export class ManufacturerManagementComponent implements OnInit {
  // Data source for the table
  manufacturerDataSource = new MatTableDataSource<Manufacturer>();

  // Search term
  searchTerm: string = '';

  // Column definitions
  columns: string[] = ['name', 'country', 'address', 'phoneNumber', 'email', 'actions'];

  // Paginator
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private manufacturerService: ManufacturerService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadManufacturers();
  }

  ngAfterViewInit(): void {
    // Connect paginator to data source
    this.manufacturerDataSource.paginator = this.paginator;
  }

  // Load manufacturers from the service
  loadManufacturers(): void {
    this.manufacturerService.getManufacturers().subscribe((manufacturers) => {
      this.manufacturerDataSource.data = manufacturers;
      if (this.paginator) {
        this.manufacturerDataSource.paginator = this.paginator; // Reconnect paginator
      }
    });
  }

  // Apply search filter
  applyFilter(): void {
    this.manufacturerDataSource.filter = this.searchTerm.trim().toLowerCase();
  }

  // Open dialog for adding a new manufacturer
  openAddDialog(): void {
    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      width: '500px',
      data: { mode: 'add' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadManufacturers(); // Refresh the table
      }
    });
  }

  // Open dialog for editing a manufacturer
  openEditDialog(manufacturer: Manufacturer): void {
    const dialogRef = this.dialog.open(ManufacturerDialogComponent, {
      width: '500px',
      data: { mode: 'edit', manufacturer },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadManufacturers(); // Refresh the table
      }
    });
  }

  // Delete a manufacturer
  deleteManufacturer(id: number): void {
    if (confirm('Are you sure you want to delete this manufacturer?')) {
      this.manufacturerService.deleteManufacturer(id).subscribe(() => {
        this.loadManufacturers(); // Refresh the table
      });
    }
  }
}
