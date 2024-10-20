import { CartDocument } from '@/types/cart.types';
import axios from 'axios';
import Cookies from 'js-cookie';

interface AddProductToCartResponse {
  success: boolean;
  cart: CartDocument;
}

const token = Cookies.get("HSPToken")

export const addProductToCart = async (productId: string, ) => {
  const response = await axios.post<AddProductToCartResponse>(
    "https://harman-spare-parts-backend.vercel.app/api/v1/cart/add",
    { productId },
    {
      headers: { Authorization: token },
    }
  );
  return response.data;
};

