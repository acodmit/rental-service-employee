import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  imports: [
    MatCard,
    MatCardTitle,
    ReactiveFormsModule,
    MatFormField,
    MatProgressSpinner,
    MatError,
    CommonModule,
    MatLabel,
    MatInput,
    MatButton,
    MatCardContent,
    MatCardHeader,
  ],
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async login() {
    if (this.loginForm.invalid) return;
    this.isLoading = true;
    this.errorMessage = '';

    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.loginForm.value),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const { token } = await response.json();
      localStorage.setItem('authToken', token);

      // Decode JWT token to extract role
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role;

      localStorage.setItem('userRole', role);

      // Redirect to dashboard after successful login
      await this.router.navigate(['/dashboard']); // Ensure this line is executed
    } catch (error) {
      this.errorMessage = (error as Error).message || 'Login failed. Please try again.';
    } finally {
      this.isLoading = false;
    }
  }
}
