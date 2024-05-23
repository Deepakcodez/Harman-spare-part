import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'

// Define a type for the slice state
interface CounterState {
  items: string[],
}

// Define the initial state using that type
const initialState: CounterState = {
  items : [],
}

export const cartSlice = createSlice({
  name: 'cart',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    add : (state, action)=> {
      state.items.push(action.payload)
    }
  },
})

export const { add } = cartSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.cart.items

export default cartSlice.reducer