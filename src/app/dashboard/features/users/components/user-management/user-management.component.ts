import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '../../../../../core/services/client.service';
import { EmployeeService } from '../../../../../core/services/employee.service';
import { Client } from '../../../../../core/models/client.model';
import { Employee } from '../../../../../core/models/employee.model';
import { EmployeeDialogComponent } from '../employee-dialog/employee-dialog.component';

@Component({
  selector: 'app-user-management',
  standalone: false,
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
})
export class UserManagementComponent implements OnInit {
  // Data sources for tables
  clientDataSource = new MatTableDataSource<Client>();
  employeeDataSource = new MatTableDataSource<Employee>();

  // Search terms
  clientSearchTerm: string = '';
  employeeSearchTerm: string = '';

  // Column definitions
  clientColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'phoneNumber', 'status', 'actions'];
  employeeColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'phoneNumber', 'role', 'actions'];

  // Paginators
  @ViewChild('clientPaginator') clientPaginator!: MatPaginator;
  @ViewChild('employeePaginator') employeePaginator!: MatPaginator;

  constructor(
    private clientService: ClientService,
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadClients();
    this.loadEmployees();
  }

  ngAfterViewInit(): void {
    // Connect paginators to data sources
    this.clientDataSource.paginator = this.clientPaginator;
    this.employeeDataSource.paginator = this.employeePaginator;
  }

  // Load all clients
  loadClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clientDataSource.data = data;
      if (this.clientPaginator) {
        this.clientDataSource.paginator = this.clientPaginator; // Reconnect paginator
      }
    });
  }

  // Load all employees
  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employeeDataSource.data = data;
      if (this.employeePaginator) {
        this.employeeDataSource.paginator = this.employeePaginator; // Reconnect paginator
      }
    });
  }

  // Apply search filter for clients
  applyClientFilter(): void {
    this.clientDataSource.filter = this.clientSearchTerm.trim().toLowerCase();
  }

  // Apply search filter for employees
  applyEmployeeFilter(): void {
    this.employeeDataSource.filter = this.employeeSearchTerm.trim().toLowerCase();
  }

  // Block/unblock a client
  toggleBlockStatus(clientId: number, isBlocked: boolean): void {
    this.clientService.toggleBlockStatus(clientId, isBlocked).subscribe({
      next: () => {
        this.clientDataSource.data = this.clientDataSource.data.map((client) =>
          client.id === clientId ? { ...client, isBlocked: isBlocked } : client
        );
      },
      error: (err) => {
        console.error('Error updating block status:', err);
      },
    });
  }

  // Open dialog for adding/editing employees
  openEmployeeDialog(mode: 'add' | 'edit', employee?: Employee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, {
      width: '500px',
      data: { mode, employee },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (mode === 'add') {
          this.employeeService.addEmployee(result).subscribe(() => {
            this.loadEmployees(); // Refresh the employee list
          });
        } else if (mode === 'edit' && employee) {
          this.employeeService.updateEmployee(employee.id, result).subscribe(() => {
            this.loadEmployees(); // Refresh the employee list
          });
        }
      }
    });
  }

  // Delete an employee
  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id).subscribe(() => {
        this.employeeDataSource.data = this.employeeDataSource.data.filter((e) => e.id !== id);
      });
    }
  }
}
