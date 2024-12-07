import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { confirmPasswordValidator } from 'src/app/auth/validators/confirm-password.validator';
import { ChangePasswordService } from '../../services/change-password.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  changePasswordForm: FormGroup;
  error!: string;
  isPasswordVisible: { [key: string]: boolean } = {
    oldPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  };

  constructor(private router: Router, private fb: FormBuilder, private changePasswordService: ChangePasswordService, private toast: ToastrService) {
    this.changePasswordForm = this.fb.group({
      oldPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
      )]],
      newPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
      )]],
      confirmNewPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/
      )]]
    },
      { validator: confirmPasswordValidator }
    );
  }

  togglePasswordVisibility(field: string): void {
    this.isPasswordVisible[field] = !this.isPasswordVisible[field];
  }



  onChangePassword() {
    this.changePasswordService.changePassword(this.changePasswordForm.value).subscribe({
      next: (res: any) => { },
      error: (err) => {
        this.toast.error(err.error.message);
      },
      complete: () => {
        this.toast.success('Password changed successfully')
        this.router.navigateByUrl('/dashboard/user');
      }
    });
  }

  get oldPassword() {
    return this.changePasswordForm.get('oldPassword');
  }

  get newPassword() {
    return this.changePasswordForm.get('newPassword');
  }

  get confirmNewPassword() {
    return this.changePasswordForm.get('confirmNewPassword');
  }
}
