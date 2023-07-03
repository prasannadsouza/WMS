import { createSelector, configureStore, combineReducers, ThunkAction, Action, AnyAction, } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { HYDRATE, } from "next-redux-wrapper";
//import { appDataSlice } from "./appDataSlice"
import { appDataSlice, AppData } from "./appDataSlice"

const combinedAppReducers = combineReducers({
    AppDataReducer: appDataSlice.reducer,
})

export type appReducer = ReturnType<typeof combinedAppReducers>

const reducers = (state: appReducer, action: AnyAction) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        };
        return nextState;
    } else {
        return combinedAppReducers(state, action);
    }
};

export const store = configureStore({
    reducer: {
        reducers
    },
    devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof store.getState>;
export type HookAppReducerType = TypedUseSelectorHook<AppState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;

const appDataSliceSelector = (state: AppState): AppData => state?.reducers?.AppDataReducer;
export const selectAppData = createSelector(appDataSliceSelector, s => s);
