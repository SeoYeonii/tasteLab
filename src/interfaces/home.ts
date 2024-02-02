import { Product } from './common';

export interface ComboItem {
  id: string;
  name: string;
  description: string;
  product1: Product;
  product2: Product;
}

export interface ListItem {
  id: string;
  imgUrl: string;
  rank: number;
  name: string;
  tags: string[];
  likeNum: number;
}

export interface RecommendItem {
  id: string;
  ment: string;
  foods: Product[];
  drinks: Product[];
  foodsName: string;
  drinksName: string;
}
