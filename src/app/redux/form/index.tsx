"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface MyState {
  data: string;
}

const initialState: MyState = {
  data: "login",
};

const switchFormSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    switchFormsAction: (state, action) => {
      return { ...state, data: action.payload };
    },
  },
});

export const { switchFormsAction } = switchFormSlice.actions;
export default switchFormSlice.reducer;
