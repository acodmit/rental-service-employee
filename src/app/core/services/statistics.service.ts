import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RevenueByDay } from '../models/revenue-by-day.model';
import { RevenueByVehicleType } from '../models/revenue-by-vehicle-type.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  private baseUrl = 'http://localhost:8080/stats';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Fetch daily revenue data for a specific month
  getDailyRevenue(month: string): Observable<RevenueByDay[]> {
    return this.http.get<RevenueByDay[]>(`${this.baseUrl}/revenue/${month}`, this.createAuthHeaders());
  }

  // Fetch faults per vehicle data
  getFaultsPerVehicle(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.baseUrl}/faults`, this.createAuthHeaders());
  }

  // Fetch revenue by vehicle type data
  getRevenueByVehicleType(): Observable<RevenueByVehicleType[]> {
    return this.http.get<RevenueByVehicleType[]>(`${this.baseUrl}/revenue-by-type`, this.createAuthHeaders());
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
