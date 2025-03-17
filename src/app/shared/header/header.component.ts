import { Component } from '@angular/core';
import {Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  logout(): void {
    localStorage.removeItem('authToken'); // Clear the token
    this.router.navigate(['/auth/login']); // Redirect to login page
    this.snackBar.open('You have been logged out.', 'Close', { duration: 3000 });
  }
}
