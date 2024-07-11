import {create} from 'zustand';

// Define a type for the state
interface FilterState {
  category: string;
  searchKeyword: string;
  currentPage: number;
  maxPage: number;
}

// Define a type for the actions that modify the state
interface FilterActions {
  setCategory: (category: string) => void;
  setSearchKeyword: (searchKeyword: string) => void;
  setCurrentPage: (currentPage: number) => void;
  setMaxPage: (maxPage: number) => void;
}

// Create the Zustand store
const useFilterStore = create<FilterState & FilterActions>((set) => ({
  category: '',
  searchKeyword: '',
  currentPage: 1,
  maxPage: 1,
  setCategory: (category) => set((state) => ({ ...state, category })),
  setSearchKeyword: (searchKeyword) => set((state) => ({ ...state, searchKeyword })),
  setCurrentPage: (currentPage) => set((state) => ({ ...state, currentPage })),
  setMaxPage: (maxPage) => set((state) => ({ ...state, maxPage })),
}));

export const { getState } = useFilterStore;

// Selectors
export const selectCategory = (state: FilterState) => state.category;
export const selectSearchKeyword = (state: FilterState) => state.searchKeyword;
export const selectCurrentPage = (state: FilterState) => state.currentPage;
export const selectMaxPage = (state: FilterState) => state.maxPage;

export default useFilterStore;
