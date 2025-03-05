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

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  getManufacturers(): Observable<Manufacturer[]> {
    return this.http.get<Manufacturer[]>(this.baseUrl, this.createAuthHeaders());
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
