import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  paymentMethods: [],
  selectedPaymentMethod: {},
};

const paymentMethodSlice = createSlice({
  name: "PaymentMethods",
  initialState,
  reducers: {
    setPaymentMethod: (state, { payload = [] }) => {
      state.paymentMethods = payload;
    },
    setSelectedPaymentMethod: (state, { payload = {} }) => {
      state.selectedPaymentMethod = payload;
    },
  },
});

const { reducer, actions } = paymentMethodSlice;

export const { setPaymentMethod, setSelectedPaymentMethod } = actions;

export default reducer;
