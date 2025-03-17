import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rental } from '../models/rental.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RentalService {
  private baseUrl = 'http://localhost:8080/rentals';

  constructor(private http: HttpClient, private authService: AuthService) {}

  // Get all rentals
  getRentals(): Observable<Rental[]> {
    return this.http.get<Rental[]>(this.baseUrl, this.createAuthHeaders());
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
