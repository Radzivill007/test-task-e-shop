import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { CartProduct } from "./types";

const cartProductCookies = Cookies.get("CartProducts");
const initialCartProduct: CartProduct[] =
  cartProductCookies && JSON.parse(cartProductCookies);

interface CartState {
  items: CartProduct[];
}

const initialState: CartState = {
  items: initialCartProduct || [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartProduct>) {
      state.items.push(action.payload);
      Cookies.set("CartProducts", JSON.stringify(state.items));
    },
    removeFromCart(state, action: PayloadAction<Partial<CartProduct>>) {
      const title = action.payload.title;
      const color = action.payload.color;
      const size = action.payload.size;
      state.items = state.items.filter(
        (item) =>
          !(item.title === title && item.color === color && item.size === size)
      );
      Cookies.set("CartProducts", JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
