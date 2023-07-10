import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/*
import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser } from "@/lib/types/types";
*/

import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser } from "@/lib/types/types";

export interface AppData {
    currentTitle: string;
    companyName: string | null,
    loggedInUser: AppUser | null,
}

const initialState: AppData = {
    currentTitle: "WMS",
    companyName: null,
    loggedInUser: null,
};

export const appDataSlice = createSlice({
    name: AppReducerConstants.app,
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            return { ...action.payload }
        },
        setCurrentTitle: (state, action) => {
            return { ...state, currentTitle: action.payload };
        },
        setCompanyName: (state, action) => {
            return { ...state, companyName: action.payload };
        },
        setLoggedInUser: (state, action) => {
            return { ...state, loggedInUser: action.payload };
        },
    },
});
