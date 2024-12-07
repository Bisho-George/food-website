import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { SharedModule } from 'src/app/shared/shared.module';
import { ChangePasswordComponent } from '../change-password/change-password/change-password.component';
import { FavRecipesComponent } from './components/fav-recipes/fav-recipes.component';
import { RecipeItemComponent } from './components/recipe-item/recipe-item.component';
import { ViewRecipeComponent } from './components/view-recipe/view-recipe.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { RecipesComponent } from './recipes.component';


@NgModule({
  declarations: [
    RecipesComponent,
    ViewRecipeComponent,
    FavRecipesComponent,
    RecipeItemComponent,
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    RecipesRoutingModule,
    SharedModule,
  ]
})
export class RecipesModule { }
