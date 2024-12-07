import { IUser } from './../interfaces/IUser.interface';
import { Component, HostListener, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { ToastrService } from 'ngx-toastr';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { IMenu } from '../interfaces/IMenu.interface';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { ProfileComponent } from 'src/app/profile/profile.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('slideInOut', [
      state(
        'closed',
        style({
          transform: 'translateX(-20%)',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('closed => open', [
        style({ transform: 'translateX(20%)', opacity: 0 }),
        animate('300ms ease-out'),
      ]),
      transition('open => closed', [
        animate('300ms ease-in', style({ transform: 'translateX(-20%)', opacity: 0 })),
      ]),
    ]),
  ]

})
export class NavbarComponent implements OnInit {
  user: IUser | null = null;
  baseUrl = 'https://upskilling-egypt.com:3006/';
  profileImage = '';
  isMenuOpen = false;
  pages: IMenu[] = []

  isAdmin(): boolean {
    return this.authService.role === 'SuperAdmin';
  }
  isUser(): boolean {
    return this.authService.role === 'SystemUser';
  }
  constructor(private profileService: ProfileService, private dialog: MatDialog, private toast: ToastrService, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.profileService.getCurrentUser().subscribe({
      next: (user: IUser) => {
        this.user = user;
        this.profileImage = this.baseUrl + user.imagePath;
      },
      error: (err) => {
        this.toast.error(err.error.message);
      }
    })
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  onLogout() {
    this.authService.logout();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const isDropdownClick = target.closest('.dropdown-menu') || target.closest('.dropdown-toggle');

    if (!isDropdownClick && this.isMenuOpen) {
      this.closeMenu();
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  onEscape(event: KeyboardEvent) {
    if (this.isMenuOpen) {
      this.closeMenu();
    }
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
  openProfile() {
    const dialogRef = this.dialog.open(ProfileComponent, {
      width: '1000px',
      data: this.user
    });
    dialogRef.afterClosed().subscribe(() => {
      this.profileService.getCurrentUser().subscribe({
        next: (user: IUser) => {
          this.user = user;
          this.profileImage = this.baseUrl + user.imagePath;
        },
        error: (err) => {
          this.toast.error(err.error.message);
        }
      })
    })
  }
}
