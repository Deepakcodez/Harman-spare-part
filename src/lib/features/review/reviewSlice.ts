import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store/store';

// Define a type for the slice state
interface ReviewState {
  isShown: boolean;
}

// Define the initial state using that type
const initialState: ReviewState = {
  isShown: false,
};

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    toggleIsShown: (state) => {
      state.isShown = !state.isShown;
    },
  },
});

export const { toggleIsShown } = reviewSlice.actions;

// Selector
export const selectIsShown = (state: RootState) => state.review.isShown;

export default reviewSlice.reducer;
