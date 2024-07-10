import { CartDocument } from '@/types/cart.types';
import axios from 'axios';
import mongoose from 'mongoose';

export interface AddProductToCartData {
  productId: mongoose.Types.ObjectId;
  quantity?: number;
  cartId?: string;
}

export interface AddProductToCartResponse {
    success: boolean;
    cart: CartDocument; 
  }

export const addProductToCart = async (data: AddProductToCartData): Promise<AddProductToCartResponse> => {
  const response = await axios.post('http://localhost:8000/api/v1/cart/add', data);
  return response.data;
};