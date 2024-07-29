import {create} from 'zustand';
import { CartDocument } from '@/types/cart.types';

interface CartStore {
  isLoadingInStore : boolean;
  setIsLoadingInStore : (state : boolean)=> void
  isErrorInStore :Error | null;
  setIsErrorInStore : (state : Error | null)=> void
  cart: CartDocument | null;
  setCart: (cart: CartDocument) => void;
  clearCart: () => void;
}

const useCartProductStore = create<CartStore>((set) => ({
  isLoadingInStore : true,
  setIsLoadingInStore : (state) => set({isLoadingInStore : state}),
  isErrorInStore: null,
  setIsErrorInStore : (state)=> set({isErrorInStore : state}),
  cart: null,
  setCart: (cart) => set({ cart }),
  clearCart: () => set({ cart: null }),
}));

export default useCartProductStore;
