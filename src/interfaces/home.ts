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
