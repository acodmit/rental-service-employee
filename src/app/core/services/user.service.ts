// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/users';

  constructor(
    private http: HttpClient,
    private authService: AuthService // Inject AuthService
  ) {}

  // Fetch user details by username
  getUserDetails(): Observable<any> {
    const username = this.getUsernameFromToken();
    if (!username) {
      throw new Error('Username not found in token.');
    }
    return this.http.get<any>(`${this.baseUrl}/user-info/${username}`, this.createAuthHeaders());
  }

  // Extract username from the JWT token
  private getUsernameFromToken(): string | null {
    const token = this.authService.getToken();
    if (!token) {
      return null;
    }
    const decodedToken: any = jwtDecode(token);
    return decodedToken.sub; // Assuming the username is in the "sub" claim
  }

  // Create headers with the authorization token
  private createAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authService.getToken();
    return {
      headers: new HttpHeaders({
        Authorization: token ? `Bearer ${token}` : '',
      }),
    };
  }
}
