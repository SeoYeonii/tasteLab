import { Product } from './common';

export interface ProfileInfo {
  userId: number;
  nickname: string;
  email: string;
  profileImageUrl: string;
}

export interface SaveItemInfo extends Product {
  categoryName: string;
}
