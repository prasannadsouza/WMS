import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
//import { appDataSlice } from "./appDataSlice"
import { appDataSlice } from "./appDataSlice"

const reducers = {
    AppDataReducer: appDataSlice.reducer,
};

export const store = configureStore({
    reducer: reducers,
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
