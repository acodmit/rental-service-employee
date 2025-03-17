import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fault } from '../models/fault.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FaultService {
  private apiUrl = 'http://localhost:8080/faults';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch all faults
  getAllFaults(): Observable<Fault[]> {
    return this.http.get<Fault[]>(this.apiUrl, this.createAuthHeaders());
  }

  // Add a new fault
  addFault(vehicleId: number, fault: Partial<Fault>): Observable<Fault> {
    return this.http.post<Fault>(
      this.apiUrl,
      { ...fault, vehicleId },
      this.createAuthHeaders()
    );
  }

  // Delete a fault by ID
  deleteFault(faultId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${faultId}`, this.createAuthHeaders());
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
