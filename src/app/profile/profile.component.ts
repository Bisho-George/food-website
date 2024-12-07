import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth/services/auth.service';
import { confirmPasswordValidator } from '../auth/validators/confirm-password.validator';
import { ProfileService } from '../shared/services/profile.service';
import { IUser } from '../shared/interfaces/IUser.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../admin/categories/components/dialog/dialog.component';
import { ICategory } from '../admin/categories/interfaces/category.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  profileForm: FormGroup;
  userImage: string | null = null;
  baseUrl = 'https://upskilling-egypt.com:3006/';
  isPasswordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  error!: string;
  files: File[] = [];

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private profileService: ProfileService, private router: Router, private fb: FormBuilder, private authService: AuthService, private toast: ToastrService) {
    this.profileForm = this.fb.group({
      userName: [null, [Validators.required, Validators.pattern(/^(?=.*\d)[A-Za-z\d]{1,8}$/)]],
      phoneNumber: [null, [Validators.required]],
      country: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      confirmPassword: [null, [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/)]],
    }, { validators: confirmPasswordValidator });
  }

  ngOnInit() {
    this.profileService.getCurrentUser().subscribe({
      next: (user: IUser) => {
        this.profileForm.patchValue(user);
        if (user.imagePath !== null) {
          this.userImage = this.baseUrl + user.imagePath
        }
      },
      error: (err) => this.toast.error(err.error.message)
    })
  }

  onSelect(event: { addedFiles: File[] }) {
    const selectedFile = event.addedFiles[0];

    // Validate file type and size
    if (!selectedFile.type.startsWith('image/') || selectedFile.size > 5 * 1024 * 1024) {
      this.toast.error('Invalid file type or size (max: 5MB)');
      return;
    }

    this.files = [selectedFile];
    this.userImage = null; // Clear backend image
  }


  onRemove(event: File) {
    this.files.splice(this.files.indexOf(event), 1);
    if (this.files.length === 0) {
      this.userImage = this.baseUrl + this.profileForm.value.imagePath;
    }
  }


  togglePasswordVisibility(field: string): void {
    this.isPasswordVisible[field] = !this.isPasswordVisible[field];
  }

  private buildFormData(formGroup: FormGroup, fileFields: { [key: string]: File }): FormData {
    const formData = new FormData();

    // Add all form control values
    Object.keys(formGroup.controls).forEach((key) => {
      const value = formGroup.get(key)?.value;
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    });
    // Add file if provided
    Object.keys(fileFields).forEach((key) => {
      const file = fileFields[key];
      if (file) {
        formData.append(key, file);
      }
    })

    return formData;
  }

  onChangeProfile() {
    const form = this.buildFormData(this.profileForm, { profileImage: this.files[0] });
    this.profileService.updateUser(form).subscribe({
      next: () => {},
      error: (err) => this.toast.error(err.error.message),
      complete: () => {
        this.toast.success('Profile updated successfully');
        this.dialogRef.close();
      }
    });
  }

  get email() {
    return this.profileForm.get('email');
  }

  get userName() {
    return this.profileForm.get('userName');
  }

  get phoneNumber() {
    return this.profileForm.get('phoneNumber');
  }

  get country() {
    return this.profileForm.get('country');
  }

  get confirmPassword() {
    return this.profileForm.get('confirmPassword');
  }
}
