import { IRecipe } from "./recipe.interface";

export interface IFavRecipes {
  id: number;
  creationDate: string;
  modificationDate: string;
  recipe: IRecipe;
}
