interface Product {
  id: string;
  name: string;
  imgUrl: string;
}

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
