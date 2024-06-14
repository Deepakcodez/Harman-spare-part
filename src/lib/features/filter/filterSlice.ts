import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

// Define a type for the slice state
interface FilterState {
  category: string;
  searchKeyword: string;
  currentPage: number;
  maxPage: number;
}

// Define the initial state using that type
const initialState: FilterState = {
  category: '',
  searchKeyword: '',
  currentPage: 1,
  maxPage: 1,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
    setSearchKeyword: (state, action: PayloadAction<string>) => {
      state.searchKeyword = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setMaxPage: (state, action: PayloadAction<number>) => {
      state.maxPage = action.payload;
    },
  },
});

export const { setCategory, setSearchKeyword, setCurrentPage, setMaxPage } = filterSlice.actions;

// Selectors
export const selectCategory = (state: RootState) => state.filter.category;
export const selectSearchKeyword = (state: RootState) => state.filter.searchKeyword;
export const selectCurrentPage = (state: RootState) => state.filter.currentPage;
export const selectMaxPage = (state: RootState) => state.filter.maxPage;

export default filterSlice.reducer;
