import {create} from "zustand";

interface CartState {
    cartCount: number;
    setCartCount: (count: number) => void;
    increaseCartCount: () => void;
    decreaseCartCount: () => void;
  }

export const useCartCountStore = create<CartState>((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  increaseCartCount: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decreaseCartCount: () => set((state) => ({ cartCount: state.cartCount - 1 })),
}));
