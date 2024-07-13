import mongoose from 'mongoose';

interface Product {
  productId: string;
  prodQuantity: number;
}

interface CartProduct {
  product: Product;
  quantity: number;
  price: number;
}

export interface CartDocument  {
  userId: string;
  products: CartProduct[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
