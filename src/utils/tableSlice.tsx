import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TableState {
  selectedProducts: number[];
  quantities: { [key: number]: number };
}
const initialState: TableState = {
  selectedProducts: [],
    quantities: {},
}
const tableSlice = createSlice({
  name: 'table',
  initialState,
  reducers: {
    toggleSelectedProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.selectedProducts.includes(productId)) {
        state.selectedProducts = state.selectedProducts.filter(id => id !== productId);
      } else {
        state.selectedProducts.push(productId);
      }
    },
    updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
      const { id, quantity } = action.payload;
      state.quantities[id] = quantity;
    },
  },
});

export const { toggleSelectedProduct,
  updateQuantity, } = tableSlice.actions;
export default tableSlice.reducer;
