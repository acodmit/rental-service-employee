import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const requiredRoles = route.data['role'] as string[]; // Ensure this is an array
    const userRole = this.authService.getUserRole() || 'GUEST'; // Provide a default role if null/undefined
    //console.log('RoleGuard checking roles:', requiredRoles, 'User role:', userRole);

    if (requiredRoles.includes(userRole)) {
      //console.log('RoleGuard: User has required role');
      return true; // Allow access if the user's role is in the required roles
    } else {
      //console.log('RoleGuard: User does not have required role');
      this.router.navigate(['/dashboard']); // Redirect to a safe route
      return false;
    }
  }
}
