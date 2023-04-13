import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Size } from "./types";

interface SizeState {
  items: Size[];
  sizesLoaded: boolean;
}

const initialState: SizeState = {
  items: [],
  sizesLoaded: false,
};

const sizesSlice = createSlice({
  name: "sizes",
  initialState,
  reducers: {
    setSizes(state, action: PayloadAction<Size[]>) {
      state.items = action.payload;
    },
    setSizesLoaded(state, action: PayloadAction<boolean>) {
      state.sizesLoaded = action.payload;
    },
  },
});

export const { setSizes, setSizesLoaded } = sizesSlice.actions;
export default sizesSlice.reducer;
