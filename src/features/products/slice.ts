import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "./types";

interface ProductState {
  items: Product[];
  productsLoaded: boolean;
}

const initialState: ProductState = {
  items: [],
  productsLoaded: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
    setProductsLoaded(state, action: PayloadAction<boolean>) {
      state.productsLoaded = action.payload;
    },
  },
});

export const { setProducts, setProductsLoaded } = productsSlice.actions;
export default productsSlice.reducer;
