import { ICategory } from '../../categories/interfaces/category.interface';
import { ITag } from './tag.interface';
export interface IRecipe {
  id: number;
  name: string;
  imagePath: string | null;
  description: string;
  price: number;
  creationDate: string;
  modificationDate: string;
  category: ICategory[];
  tag: ITag;
}
