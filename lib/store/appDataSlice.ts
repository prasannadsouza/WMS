import { createSlice, PayloadAction } from "@reduxjs/toolkit";
//import { AppReducerConstants } from "../../lib/constants"
import { AppReducerConstants } from "../../lib/constants"

export interface AppData {
    currentTitle: string;
    currentUserTitle: string | null;
}
const initialState: AppData = {
    currentTitle: "WMS",
    currentUserTitle: null,
};

export const appDataSlice = createSlice({
    name: AppReducerConstants.APP,
    initialState,
    reducers: {
        setAppData: (state, action: PayloadAction<AppData>) => {
            return { ...action.payload }
        },
        setCurrentTitle: (state, action) => {
            return { ...state, currentTitle: action.payload };
        },
        setCurrentUserTitle: (state, action) => {
            return { ...state, currentUserTitle: action.payload };
        }
    },
});
