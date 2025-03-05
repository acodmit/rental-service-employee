import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/services/user.service'; // Import the UserService
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-account',
  standalone: false,
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: any = null; // Store user details
  isLoading = true; // Loading state

  constructor(
    private userService: UserService, // Inject UserService
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchUserDetails();
  }

  fetchUserDetails(): void {
    this.userService.getUserDetails().subscribe({
      next: (user: any) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (err) => {
        this.snackBar.open('Failed to fetch user details.', 'Close', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }
}
