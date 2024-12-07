import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../shared/home/home.component';
import { ChangePasswordComponent } from './change-password/change-password/change-password.component';
import { FavRecipesComponent } from './recipes/components/fav-recipes/fav-recipes.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'recipes', loadChildren: () => import('./recipes/recipes.module').then(m => m.RecipesModule) },
  { path: 'favs', component: FavRecipesComponent },
  { path: 'change-password', loadChildren: () => import('./change-password/change-password/change-password.module').then(m => m.ChangePasswordModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
