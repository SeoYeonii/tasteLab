import { Product } from './common';

export interface ComboItemDescription {
  comboItemId: number;
  orderNumber: number;
  description: string;
}
export interface ComboItem {
  comboItemId: number;
  name: string;
  category: string;
  review: string; // 한 줄 멘트
  isGoodCount: number;
  products: Product[];
}

export interface ListItem {
  productId: number;
  productType: string;
  imageUrl: string;
  name: string;
  comboItemName: string[];
  usedCount: number;
}

export interface RecommendItem {
  ment: string;
  foodComboItem: ComboItem;
  drinkComboItem: ComboItem;
}
