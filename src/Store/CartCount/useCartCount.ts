import {create} from 'zustand';

// Define a type for the state
interface CartState {
  items: string[];
  add: (item: string) => void;
}

// Create the Zustand store
const useCartStore = create<CartState>((set) => ({
  items: [],
  add: (item: string) =>
    set((state) => ({
      items: [...state.items, item],
    })),
}));

export default useCartStore;
