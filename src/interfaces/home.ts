import { Product } from './common';

export interface ComboItemDescription {
  comboItemId: number;
  orderNumber: number;
  description: string;
}
export interface ComboItem {
  comboItemId: number;
  name: string;
  review: string; // 한 줄 멘트
  isGoodCount: number;
  products: Product[];
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
  comboItemId: number;
  ment: string;
  foods: Product[];
  drinks: Product[];
  foodsName: string;
  drinksName: string;
}
