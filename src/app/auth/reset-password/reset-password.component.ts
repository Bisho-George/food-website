import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { confirmPasswordValidator } from '../validators/confirm-password.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetForm: FormGroup;
  resMessage = '';
  isPasswordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };
  error!: string;

  constructor(private router: Router, private fb: FormBuilder, private authService: AuthService, private toast: ToastrService) {
    this.resetForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      seed: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
      confirmPassword: [null, [Validators.required]],
    }, { validators: confirmPasswordValidator });
  }
  ngOnInit(): void {
    const email = localStorage.getItem('userEmail');
    this.resetForm.patchValue({ email })
  }

  togglePasswordVisibility(field: string): void {
    this.isPasswordVisible[field] = !this.isPasswordVisible[field];
  }

  onReset() {
    this.authService.resetPassword(this.resetForm.value).subscribe({
      next: (res: any) => {
        this.resMessage = res.message;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success(this.resMessage);
        localStorage.removeItem('userEmail');
        this.router.navigateByUrl('auth/login')
      }
    }
    );
  }

  get email() {
    return this.resetForm.get('email');
  }

  get seed() {
    return this.resetForm.get('seed');
  }

  get password() {
    return this.resetForm.get('password');
  }

  get confirmPassword() {
    return this.resetForm.get('confirmPassword');
  }
}
