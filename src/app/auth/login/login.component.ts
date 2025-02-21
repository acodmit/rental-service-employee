import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatInput } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { jwtDecode } from 'jwt-decode';

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
    MatCardHeader
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
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
        body: JSON.stringify(this.loginForm.value)
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const { token } = await response.json();
      localStorage.setItem('authToken', token);

      // Decode JWT token to extract role
      const decodedToken: any = jwtDecode(token);
      const role = decodedToken.role; // Ensure this matches your backend claim name

      localStorage.setItem('userRole', role);

      // Redirect based on role
      switch (role) {
        case 'ADMIN': window.location.href = '/admin'; break;
        case 'OPERATOR': window.location.href = '/operator'; break;
        case 'MANAGER': window.location.href = '/manager'; break;
        default: throw new Error('Unknown role');
      }
    } catch (error) {
      this.errorMessage = (error as Error).message;
    } finally {
      this.isLoading = false;
    }
  }
}
