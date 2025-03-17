import { Component, OnInit } from '@angular/core';
import { Fault } from '../../../../../core/models/fault.model';
import { MatDialog } from '@angular/material/dialog';
import { AddFaultDialogComponent } from '../add-fault-dialog/add-fault-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import {FaultService} from '../../../../../core/services/fault.service';
import {VehicleService} from '../../../../../core/services/vehicle.service';

@Component({
  selector: 'app-fault-reporting',
  standalone: false,
  templateUrl: './fault-reporting.component.html',
  styleUrls: ['./fault-reporting.component.css'],
})
export class FaultReportingComponent implements OnInit {
  faults: Fault[] = [];
  dataSource = new MatTableDataSource<Fault>();
  displayedColumns: string[] = ['description', 'reportedDate', 'actions'];

  constructor(private faultService: FaultService, private vehicleService: VehicleService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadFaults();
  }

  loadFaults(): void {
    this.faultService.getAllFaults().subscribe((faults) => {
      this.faults = faults;
      this.dataSource.data = faults;
    });
  }

  openAddFaultDialog(): void {
    const dialogRef = this.dialog.open(AddFaultDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.vehicleService.addFault(result.vehicleId, result).subscribe(() => {
          this.loadFaults(); // Refresh the list of faults
        });
      }
    });
  }

  deleteFault(faultId: number): void {
    if (confirm('Are you sure you want to delete this fault?')) {
      this.faultService.deleteFault(faultId).subscribe(() => {
        this.loadFaults(); // Refresh the list of faults
      });
    }
  }
}
