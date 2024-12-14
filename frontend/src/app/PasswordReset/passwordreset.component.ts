import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-passwordreset',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './passwordreset.component.html',
  styleUrl: './passwordreset.component.css',
})
export class PasswordResetComponent {
  passwordResetForm: FormGroup;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
  ) {
    this.passwordResetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendPasswordReset() {
    if (this.passwordResetForm.invalid) {
      return;
    }

    const email = this.passwordResetForm.value.email;

    this.authService.resetPassword(email).subscribe({
      next: () => {
        this.successMessage =
          'Password reset email sent successfully! Please check your inbox.';
        this.errorMessage = '';
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message}`;
        this.successMessage = '';
      },
    });
  }

  redirectToLogin() {
    this.router.navigate(['/profile']);
  }
}
