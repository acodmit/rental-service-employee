import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ClientService } from '../../../../../core/services/client.service';
import { Client } from '../../../../../core/models/client.model';

@Component({
  selector: 'app-client-management',
  standalone: false,
  templateUrl: './client-management.component.html',
  styleUrls: ['./client-management.component.css'],
})
export class ClientManagementComponent implements OnInit {
  // Data source for the table
  clientDataSource = new MatTableDataSource<Client>();

  // Search term
  clientSearchTerm: string = '';

  // Column definitions
  clientColumns: string[] = ['username', 'firstName', 'lastName', 'email', 'phoneNumber', 'status', 'actions'];

  // Paginator
  @ViewChild('clientPaginator') clientPaginator!: MatPaginator;

  constructor(private clientService: ClientService) {}

  ngOnInit(): void {
    this.loadClients();
  }

  ngAfterViewInit(): void {
    // Connect paginator to the data source
    this.clientDataSource.paginator = this.clientPaginator;
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

  // Apply search filter for clients
  applyClientFilter(): void {
    this.clientDataSource.filter = this.clientSearchTerm.trim().toLowerCase();
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
}
