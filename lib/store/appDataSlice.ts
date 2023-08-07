import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/*
import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser, AppCustomer } from "@/lib/types/types";
*/

import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser, AppCustomer } from "@/lib/types/types";

export interface AppData {
    currentTitle: string;
    loggedInUser: AppUser | null,
    organisation: AppCustomer | null
}

const initialState: AppData = {
    currentTitle: "WMS",
    organisation: null,
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
        setOrganisation: (state, action) => {
            return { ...state, organisation: action.payload };
        },
        setLoggedInUser: (state, action) => {
            return { ...state, loggedInUser: action.payload };
        },
    },
});
