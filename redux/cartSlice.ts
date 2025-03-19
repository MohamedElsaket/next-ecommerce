import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Cart {
  _id: number;
  name: string;
  price: {
    price: number;
  };
  media: {
    mainMedia: {
      image: {
        url: string;
      };
    };
  };
  quantity: number;
}

export interface CartState {
  items: Cart[];
}

const initialState: CartState = {
  items:
    typeof window !== "undefined" && localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Omit<Cart, "quantity">>) => {
      const existedItem = state.items.find(
        (item) => item._id === action.payload._id
      );

      if (existedItem) {
        existedItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    removeItem: (state, action: PayloadAction<Omit<Cart, "quantity">>) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    clearItems: (state) => {
      state.items = [];
      localStorage.removeItem("cartItems");
    },

    increaseItem: (state, action: PayloadAction<Omit<Cart, "quantity">>) => {
      const selectedItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (selectedItem) selectedItem.quantity += 1;
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },

    decreaseItem: (state, action: PayloadAction<Omit<Cart, "quantity">>) => {
      const selectedItem = state.items.find(
        (item) => item._id === action.payload._id
      );
      if (selectedItem) selectedItem.quantity -= 1;

      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
  },
});

export const { addItem, removeItem, clearItems, increaseItem, decreaseItem } =
  cartSlice.actions;

export default cartSlice.reducer;
