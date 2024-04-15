"use client";
import { createSlice, PayloadAction } from '@reduxjs/toolkit'


interface UserData {
    token: string | null;
    user: {
        email: string | null,
        firstName: string | null,
        lastName: string | null,
        phoneNumber: string | null,
    } 
}

const isClient = typeof window !== 'undefined';

const storedUser = isClient ? localStorage.getItem('user') : null;
const userData: UserData | null = storedUser ? JSON.parse(storedUser) : null;

const initialState: UserData = userData || {
    token: null,
    user: {
        email: null,
        firstName: null,
        lastName: null,
        phoneNumber: null,
    }
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action: PayloadAction<UserData>)  => {
            return { ...state, ...action.payload }
        },

        clearUserData: (state) => {
            if (isClient) {
                localStorage.removeItem('user');
            }
            return {
                token: null,
                user: {
                    email: null,
                    firstName: null,
                    lastName: null,
                    phoneNumber: null,
                }
            }
        }
    }
});

export const { setUserData, clearUserData } = userSlice.actions;

export default userSlice.reducer;