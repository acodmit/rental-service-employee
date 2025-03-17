import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from '../models/client.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl = 'http://localhost:8080/clients';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all clients
  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.baseUrl, this.createAuthHeaders());
  }

  // Block/unblock a client
  toggleBlockStatus(clientId: number, isBlocked: boolean): Observable<void> {
    return this.http.patch<void>(
      `${this.baseUrl}/${clientId}/block`,
      { isBlocked },
      this.createAuthHeaders()
    );
  }

  // Helper method to create authentication headers
  private createAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }
}
