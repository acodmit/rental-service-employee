import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bike } from '../models/bike.model';
import { Car } from '../models/car.model';
import { Scooter } from '../models/scooter.model';
import { AuthService } from './auth.service';
import {Fault} from '../models/fault.model';
import {Rental} from '../models/rental.model';
import {Vehicle} from '../models/vehicle.model';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getVehicles(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/vehicles`, this.createAuthHeaders());
  }

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

  // Fetch bike details by ID
  getBikeById(id: number): Observable<Bike> {
    return this.http.get<Bike>(`${this.baseUrl}/bikes/${id}`, this.createAuthHeaders());
  }

  // Fetch car details by ID
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.baseUrl}/cars/${id}`, this.createAuthHeaders());
  }

  // Fetch scooter details by ID
  getScooterById(id: number): Observable<Scooter> {
    return this.http.get<Scooter>(`${this.baseUrl}/scooters/${id}`, this.createAuthHeaders());
  }

  // Fetch faults for a specific vehicle
  getFaults(vehicleId: number): Observable<Fault[]> {
    return this.http.get<Fault[]>(`${this.baseUrl}/vehicles/${vehicleId}/faults`, this.createAuthHeaders());
  }

  // Fetch rentals for a specific vehicle
  getRentals(vehicleId: number): Observable<Rental[]> {
    return this.http.get<Rental[]>(`${this.baseUrl}/vehicles/${vehicleId}/rentals`, this.createAuthHeaders());
  }

  // Add a fault for a specific vehicle
  addFault(vehicleId: number, fault: Fault): Observable<Fault> {
    return this.http.post<Fault>(`${this.baseUrl}/vehicles/${vehicleId}/faults`, fault, this.createAuthHeaders());
  }

  // Delete a fault for a specific vehicle
  deleteFault(vehicleId: number, faultId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/vehicles/${vehicleId}/faults/${faultId}`, this.createAuthHeaders());
  }

  // Add a rental
  addRental(rental: Rental): Observable<Rental> {
    return this.http.post<Rental>(`${this.baseUrl}/rentals`, rental, this.createAuthHeaders());
  }

  // New method for uploading CSV
  uploadCSV(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    // Include authentication headers
    const headers = this.createAuthHeaders().headers;
    return this.http.post(`${this.baseUrl}/vehicles/upload-csv`, formData, { headers });
  }

  // Update a vehicle
  updateVehicle(id: number, updateData: Partial<Vehicle>): Observable<Vehicle> {
    return this.http.patch<Vehicle>(`${this.baseUrl}/vehicles/${id}/hourly-rate`, updateData, this.createAuthHeaders());
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
