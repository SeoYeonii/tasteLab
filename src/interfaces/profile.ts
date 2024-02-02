import { Product } from './common';

export interface ProfileInfo {
  name: string;
  email: string;
  picture?: string;
}

export interface SaveItemInfo extends Product {
  categoryName: string;
}

// export interface
