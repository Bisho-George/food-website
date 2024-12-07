import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { IRecipeFilter } from './interfaces/recipe-filter.interface';
import { IRecipe } from './interfaces/recipe.interface';
import { ITag } from './interfaces/tag.interface';
import { IResponse } from 'src/app/admin/categories/interfaces/categories-response.interface';
import { ICategory } from 'src/app/admin/categories/interfaces/category.interface';
import { IFilter } from 'src/app/admin/categories/interfaces/filter.interface';
import { CategoriesService } from 'src/app/admin/categories/services/categories.service';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { RecipeService } from './services/recipe.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.scss']
})
export class RecipesComponent {
  pageNumber: number = 1;
  pageSize: number = 10;
  categories: ICategory[] = [];
  tableResponse?: IResponse<IRecipe>;
  name: string = '';
  tags: ITag[] = [];
  tagId: number = 0;
  categoryId: number = 0;
  baseUrl = 'https://upskilling-egypt.com:3006/';
  constructor(private recipeService: RecipeService, private categoriesService: CategoriesService, private toast: ToastrService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getCategories();
    this.getTags();
    this.getRecipes();
  }

  getCategories() {
    let params: IFilter = {
      pageNumber: 0,
      pageSize: 9000,
      name: ''
    }
    this.categoriesService.getCategories(params).subscribe({
      next: (res: IResponse<ICategory>) => {
        this.categories = res.data;
      },
      error: (err) => {
        this.toast.error(err.error.message)
      },
      complete: () => { }
    });
  }

  getRecipes() {
    let params: IRecipeFilter = {
      pageNumber: this.pageNumber,
      pageSize: this.pageSize,
      name: this.name,
      tagId: this.tagId,
      categoryId: this.categoryId,
    }
    this.recipeService.getRecipes(params).subscribe({
      next: (res: IResponse<IRecipe>) => {
        this.tableResponse = res;
        this.tableResponse = {
          ...res,
          data: res.data.map((recipe) => ({
            ...recipe,
            imagePath: recipe.imagePath ? `${this.baseUrl}${recipe.imagePath}` : null,
          })),
        };
      },
      error: (err) => {
        this.toast.error('Failed to get recipes');
      },
      complete: () => { }
    })
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageNumber = e.pageIndex;
    this.getCategories();
  }

  getTags() {
    this.recipeService.getTags().subscribe({
      next: (res) => {
        this.tags = res;
      },
      error: (err) => {
        this.toast.error('Failed to get tags');
      }
    })
  }
  openViewDialog(recipe: IRecipe) {
    const dialogRef = this.dialog.open(ViewRecipeComponent, {
      data: { recipe: recipe }
    })
    dialogRef.afterClosed().subscribe((result) => {
      if (result?.id) {
        this.recipeService.addToFavorite(recipe.id).subscribe({
          next: (res) => { console.log(res) },
          error: (err: any) => {
            this.toast.error('Failed to add recipe to favorites');
          },
          complete: () => {
            this.toast.success('Recipe added to favorites');
          }
        })
      }
    })
  }

}

