import { create } from 'zustand';
import axios, { AxiosError } from 'axios';

interface CartState {
  isLoading: boolean;
  error: string | null;
  cartCount: number;
  checkProductInCart: (token: string | undefined) => Promise<any>;
  increaseCartCount: () => void;
  decreaseCartCount: () => void;
}


// Define a type for the API error response structure
interface ErrorResponse {
  message: string;
  // Add other fields as needed
}

export const useCartDetailStore = create<CartState>((set) => ({
  isLoading: false,
  error: null,
  cartCount: 0,
  checkProductInCart: async (token: string | undefined) => {
    try {
      set({ isLoading: true, error: null });
      const resp = await axios.get(
        `https://harman-spare-parts-backend.vercel.app/api/v1/cart/details`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const cart = resp.data.cart;
      // Optionally, process cart data if needed
      set({ isLoading: false });
      return cart;
    } catch (error) {
      // Handle Axios error responses
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<ErrorResponse>;
        set({ error: axiosError.response?.data.message ?? 'Unknown error', isLoading: false });
        console.error("Error fetching cart:", axiosError);
      } else {
        // Handle generic errors
        set({ isLoading: false });
        console.error("Error fetching cart:", error);
      }
      return null;
    }
  },



  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decreaseCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
}));
