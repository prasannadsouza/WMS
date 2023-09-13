import { createSlice, PayloadAction } from "@reduxjs/toolkit";
/*
import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser, AppCustomer,ConfirmModel } from "@/lib/types/types";
import { ShowConfirm, ShowMessage } from "@/lib/types/models";
*/

import { AppReducer as AppReducerConstants } from "@/lib/types/constants";
import { AppUser, AppCustomer } from "@/lib/types/types";

export interface AppData {
    currentTitle: string;
    loggedInUser: AppUser | null,
    organisation: AppCustomer | null,
    showLoading?: boolean | null,
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
        setCurrentTitle: (state, action: PayloadAction<string>) => {
            return { ...state, currentTitle: action.payload };
        },
        setOrganisation: (state, action: PayloadAction<AppCustomer | null>) => {
            return { ...state, organisation: action.payload };
        },
        setLoggedInUser: (state, action: PayloadAction<AppUser | null>) => {
            return { ...state, loggedInUser: action.payload };
        },
    },
});
