import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  reviews: [],
  selectedReview: {},
};

const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    setReviews: (state, { payload }) => {
      state.reviews = payload;
    },
    setSeletectedReview: (state, { payload }) => {
      state.selectedReview = payload;
    },
  },
});

const { reducer, actions } = reviewSlice;

export const { setReviews, setSeletectedReview } = actions;

export default reducer;
