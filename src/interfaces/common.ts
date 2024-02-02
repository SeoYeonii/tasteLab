export interface Page<T> {
  totalElements: number;
  totalPages: number;
  size: number;
  number: number; // 현재 페이지
  numberOfElements: number; // 현재 페이지의 데이터 수

  content: T[];
}

export interface Product {
  id: string;
  name: string;
  imgUrl: string;
}
