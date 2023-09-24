export type Product = {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
};

type MenuItem = {
  name: string;
  products: Product[];
};

export type CartItem = {
  product: Product;
  quantity: number;
};

export type Menu = MenuItem[];

export type Cart = CartItem[];
