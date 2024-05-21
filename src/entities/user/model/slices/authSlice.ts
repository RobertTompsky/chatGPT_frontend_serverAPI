import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../types";

interface InitialState {
    user: IUser | null,
    isAuthenticated: boolean
}

const initialState: InitialState = {
    user: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logIn: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload
            state.isAuthenticated = true
        },
        logOut: () => initialState
    }
})

export const authReducer = authSlice.reducer

export const {logIn, logOut} = authSlice.actions