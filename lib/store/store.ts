import { createSelector, configureStore, ThunkAction, Action, } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/*
import { appDataSlice, AppData } from "@/lib/store/appDataSlice"
*/

import { appDataSlice, AppData } from "@/lib/store/appDataSlice"

export const appStore = configureStore({
    reducer: {
        AppDataReducer: appDataSlice.reducer,
    },
    devTools: true,
});

export type AppDispatch = typeof appStore.dispatch;
export type AppState = ReturnType<typeof appStore.getState>;
export type AppStore = typeof appStore;
export type HookAppReducerType = TypedUseSelectorHook<AppState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

const appDataSliceSelector = (state: AppState): AppData => state?.AppDataReducer;
export const selectAppData = createSelector(appDataSliceSelector, s => s);
