import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';
import { IResponse } from '../categories/interfaces/categories-response.interface';
import { UserService } from './services/user.service';
import { IUsersFilter } from './interfaces/users-filter.interface';
import { IUser } from 'src/app/shared/interfaces/IUser.interface';
import { ViewUserDialogComponent } from './components/view-user-dialog/view-user-dialog.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  pageNumber: number = 1;
  pageSize: number = 10;
  tableResponse?: IResponse<IUser>;
  searchVal: string = '';
  baseUrl = 'https://upskilling-egypt.com:3006/';
  criteria: string = 'Username';
  role: number[] = [1, 2];
  searchCriterias: string[] = ['Username', 'Country', 'Email'];
  constructor(private toast: ToastrService, private dialog: MatDialog, private userService: UserService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    console.log(this.role);
    let params: IUsersFilter = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      userName: this.criteria === 'Username' ? this.searchVal : '',
      country: this.criteria === 'Country' ? this.searchVal : '',
      email: this.criteria === 'Email' ? this.searchVal : '',
      groups: this.role
    }
    this.userService.getUsers(params).subscribe({
      next: (res: IResponse<IUser>) => {
        console.log(res);
        this.tableResponse = res;
        this.tableResponse = {
          ...res,
          data: res.data.map((user) => ({
            ...user,
            imagePath: user.imagePath ? `${this.baseUrl}${user.imagePath}` : null,
          })),
        };
      },
      error: (err) => {
        this.toast.error(err.error.message)
      },
      complete: () => { }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getUsers();
  }

  openDeleteDialog(user: IUser) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: { text: 'User', item: user, name: user.userName },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'delete') {
        this.userService.deleteUser(user.id).subscribe({
          next: () => { },
          error: () => this.toast.error("Please try again later"),
          complete: () => {
            this.toast.success("User Deleted Successfully");
            this.getUsers();
          },
        })
      }
    });
  }
  clearFilters () {
    this.searchVal = '';
    this.criteria = 'Username';
    this.role = [1, 2];
    this.getUsers();
  }

  openViewUser (user: IUser) {
    this.dialog.open(ViewUserDialogComponent, {
      width: '800px',
      data: user
    });
  }
}
