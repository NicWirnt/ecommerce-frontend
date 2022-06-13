import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showAdminSideBar: false,
};

const systemSlice = createSlice({
  name: "systemSlice",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.showAdminSideBar = !state.showAdminSideBar;
    },
  },
});

const { reducer, actions } = systemSlice;

export const { toggleSidebar } = actions;

export default reducer;
