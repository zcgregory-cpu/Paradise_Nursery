import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const plant = action.payload;
      const existing = state.items.find((item) => item.id === plant.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((plant) => plant.id === id);
      if (item) {
        item.quantity = quantity;
      }

      if (item && item.quantity < 1) {
        state.items = state.items.filter((plant) => plant.id !== id);
      }
    },
    increaseItem: (state, action) => {
      const item = state.items.find((plant) => plant.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decreaseItem: (state, action) => {
      const item = state.items.find((plant) => plant.id === action.payload);
      if (!item) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        state.items = state.items.filter((plant) => plant.id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((plant) => plant.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, updateQuantity, increaseItem, decreaseItem, removeItem, clearCart } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartQuantity = (state) =>
  state.cart.items.reduce((total, item) => total + item.quantity, 0);
export const selectCartTotal = (state) =>
  state.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;
