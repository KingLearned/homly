"use client";
import { configureStore } from "@reduxjs/toolkit";
import switchFormSlice from "@/app/redux/form/index";
import modaSlice from "@/app/redux/modal/index";
import roommateSlice from "@/app/redux/room_mate/index";

export const store = configureStore({
  reducer: {
    form: switchFormSlice,
    modal: modaSlice,
    room_mate: roommateSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
