import { IMenu } from '../interfaces/IMenu.interface';
import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  pages: IMenu[] = []

  isAdmin(): boolean {
    return this.authService.role === 'SuperAdmin';
  }
  isUser(): boolean {
    return this.authService.role === 'SystemUser';
  }

  constructor(private authService: AuthService) {
    this.pages = [
      { path: 'home', text: 'Home', icon: 'fa fa-house', isActive: true },
      { path: 'admin/users', text: 'Users', icon: 'fa-solid fa-user-group', isActive: this.isAdmin() },
      { path: this.isAdmin() ? 'admin/recipes' : 'user/recipes', text: 'Recipes', icon: 'fa-regular fa-calendar-days', isActive: true },
      { path: 'admin/categories', text: 'Categories', icon: 'fa-regular fa-calendar-days', isActive: this.isAdmin() },
      { path: 'user/favs', text: 'Favourites', icon: 'fa-regular fa-heart', isActive: this.isUser() },
    ]
  }

  onLogout () {
    this.authService.logout();
  }

}
