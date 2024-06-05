import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartslice'
import reviewReducer from '../features/review/reviewSlice';

export const createStore=()=>{
return configureStore({
    reducer: {
      cart: cartReducer,
      review: reviewReducer,
    },
   
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof createStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']