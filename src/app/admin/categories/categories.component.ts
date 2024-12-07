import { ToastrService } from 'ngx-toastr';
import { ICategory } from './interfaces/category.interface';
import { IFilter } from './interfaces/filter.interface';
import { CategoriesService } from './services/categories.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { IResponse } from './interfaces/categories-response.interface';
import { DeleteDialogComponent } from 'src/app/shared/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoriesComponent implements OnInit {
  pageNumber: number = 1;
  pageSize: number = 10;
  categories: ICategory[] = [];
  resMessage: any;
  tableResponse?: IResponse<ICategory>;
  name: string = '';
  constructor(private categoriesService: CategoriesService, private toast: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    let params: IFilter = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      name: this.name
    }
    this.categoriesService.getCategories(params).subscribe({
      next: (res: IResponse<ICategory>) => {
        this.categories = res.data;
        this.tableResponse = res;
      },
      error: (err) => {
        this.toast.error(err.error.message)
      },
      complete: () => { }
    });
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    console.log(this.pageSize);
    this.getCategories();
  }

  openDialog(category: ICategory | null, dialogType: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { category, type: dialogType },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result?.category?.name) {
        switch (dialogType) {
          case 'Add':
            console.log(result.category.name);
            this.categoriesService.addCategory(result.category.name).subscribe({
              next: () => this.toast.success("Category Added Successfully"),
              error: () => this.toast.error("Please try again later"),
              complete: () => this.getCategories(),
            });
            break;
          case 'Edit':
            this.categoriesService.updateCategory(result.category.id, result.category.name).subscribe({
              next: () => this.toast.success("Category Updated Successfully"),
              error: () => this.toast.error("Please try again later"),
              complete: () => this.getCategories(),
            });
            break;
          case 'View':
            break;
          default:
            break;
        }
      }
    });
  }
  openDeleteDialog(category: ICategory) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {text: 'Category', item: category},
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.action === 'delete') {
        this.categoriesService.deleteCategory(category.id).subscribe({
          next: () => { },
          error: () => this.toast.error("Please try again later"),
          complete: () => {
            this.toast.success("Category Deleted Successfully");
            this.getCategories();
          },
        })
      }
    });
  }
}

