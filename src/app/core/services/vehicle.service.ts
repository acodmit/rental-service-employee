import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike.model';
import { Car } from '../models/car.model';
import { Scooter } from '../models/scooter.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getBikes(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/bikes`, this.createAuthHeaders());
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.baseUrl}/cars`, this.createAuthHeaders());
  }

  getScooters(): Observable<Scooter[]> {
    return this.http.get<Scooter[]>(`${this.baseUrl}/scooters`, this.createAuthHeaders());
  }

  addBike(bike: Bike): Observable<Bike> {
    return this.http.post<Bike>(`${this.baseUrl}/bikes`, bike, this.createAuthHeaders());
  }

  addCar(car: Car): Observable<Car> {
    return this.http.post<Car>(`${this.baseUrl}/cars`, car, this.createAuthHeaders());
  }

  addScooter(scooter: Scooter): Observable<Scooter> {
    return this.http.post<Scooter>(`${this.baseUrl}/scooters`, scooter, this.createAuthHeaders());
  }

  deleteBike(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/bikes/${id}`, this.createAuthHeaders());
  }

  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/cars/${id}`, this.createAuthHeaders());
  }

  deleteScooter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/scooters/${id}`, this.createAuthHeaders());
  }

  // New method for uploading CSV
  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Include authentication headers
    const headers = this.createAuthHeaders().headers;
    return this.http.post(`${this.baseUrl}/vehicles/upload-csv`, formData, { headers });
  }

  private createAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }
}
