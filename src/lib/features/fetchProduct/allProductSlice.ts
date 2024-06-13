import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProductState {
  isLoading: boolean;
  data: any; // You might want to specify a more precise type for the product data
  isError: boolean;
}

const initialState: ProductState = {
  isLoading: false,
  data: null,
  isError: false,
};

export const fetchAllProduct = createAsyncThunk('fetchAllProduct', async () => {
  const response = await fetch('https://harman-spare-parts-backend.vercel.app/api/v1/product/allProducts');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
});

const productSlice = createSlice({
  name: 'fetchAllProduct',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProduct.fulfilled, (state, action: PayloadAction<any>) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchAllProduct.rejected, (state, action) => {
      console.log('>>>>>>>>>>>Error', action.error.message);
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default productSlice.reducer;
