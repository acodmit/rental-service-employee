// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  // Store the authentication token
  setToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  // Retrieve the authentication token
  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Store the user role
  setUserRole(role: string): void {
    localStorage.setItem('userRole', role);
  }

  // Retrieve the user role
  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  // Check if the user is authenticated
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  // Clear the token and role (logout)
  clearAuth(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  }
}
