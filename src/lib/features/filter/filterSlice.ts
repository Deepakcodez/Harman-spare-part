import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

// Define a type for the slice state
interface FilterState {
  category: string;
}

// Define the initial state using that type
const initialState: FilterState = {
  category: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<string>) => {
      state.category = action.payload;
    },
  },
});

export const { setCategory } = filterSlice.actions;

// Selector
export const selectCategory = (state: RootState) => state.filter.category;

export default filterSlice.reducer;
