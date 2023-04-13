import { combineReducers, configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/products/slice";
import sizesReducer from "./features/sizes/slice";
import cartReducer from "./features/cart/slice";

const rootReducer = combineReducers({
  products: productsReducer,
  sizes: sizesReducer,
  cart: cartReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export default store;
