import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Manufacturer } from '../models/manufacturer.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ManufacturerService {
  private baseUrl = 'http://localhost:8080/manufacturers';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all manufacturers
  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.baseUrl, this.createAuthHeaders());
  }

  // Get a manufacturer by ID
  getManufacturerById(id: number): Observable<Manufacturer> {
    return this.http.get<Manufacturer>(`${this.baseUrl}/${id}`, this.createAuthHeaders());
  }

  // Create a new manufacturer
  addManufacturer(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.post<Manufacturer>(this.baseUrl, manufacturer, this.createAuthHeaders());
  }

  // Update an existing manufacturer
  updateManufacturer(id: number, manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.http.put<Manufacturer>(`${this.baseUrl}/${id}`, manufacturer, this.createAuthHeaders());
  }

  // Delete a manufacturer by ID
  deleteManufacturer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, this.createAuthHeaders());
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
