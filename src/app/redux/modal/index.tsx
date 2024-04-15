"use client";
import { createSlice } from "@reduxjs/toolkit";

interface MyState {
  value: boolean;
}

const initialState: MyState = {
  value: false,
};

// Open and close Modal Action
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    modalAction: (state, action) => {
      return { ...state, value: action.payload };
    },
  },
});

export const { modalAction } = modalSlice.actions;
export default modalSlice.reducer;
