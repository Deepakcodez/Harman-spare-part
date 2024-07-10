import mongoose from 'mongoose';

// Define CartProduct interface
export interface CartProduct {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number;
}

// Define CartDocument interface extending Document
export interface CartDocument extends mongoose.Document {
  userId: mongoose.Types.ObjectId;
  products: CartProduct[];
  totalPrice: number;
  createdAt?: Date;
  updatedAt?: Date;
}
