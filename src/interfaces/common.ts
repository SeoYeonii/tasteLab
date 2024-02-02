/* eslint-disable no-unused-vars */
export type SortType = 'A' | 'F' | 'D';
export type OrderType = 'TOP' | 'NEW' | 'REPLY';

export const SORT_LABEL_MAP: { [key in SortType]: string } = {
  A: '전체',
  F: '음식',
  D: '음료',
} as const;
export const ORDER_LABEL_ARR: { [key in OrderType]: string } = {
  TOP: '추천순',
  NEW: '최신순',
  REPLY: '댓글순',
};

export interface Page<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 현재 페이지
  numberOfElements: number; // 현재 페이지의 데이터 수

  content: T[];
}

export interface Product {
  productId: number;
  name: string;
  imageUrl: string;
  shopType: string;
  productType: string;
  usedCount: number;
  savedAt: string;
}
