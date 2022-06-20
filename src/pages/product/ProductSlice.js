import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const ProductSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, { payload }) => {
      state.products = payload;
    },
  },
});

const { reducer, actions } = ProductSlice;

export const { setProducts } = actions;

export default reducer;
