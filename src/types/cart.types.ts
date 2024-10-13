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
  _id : mongoose.Types.ObjectId;
  userId: string;
  products: CartProduct[];
  totalPrice: number;
  createdAt?: string;
  updatedAt?: string;
}
