import { configureStore, combineReducers, ThunkAction, Action, AnyAction } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { createWrapper, HYDRATE } from "next-redux-wrapper";
//import { appDataSlice } from "./appDataSlice"
import { appDataSlice } from "./appDataSlice"

const combinedAppReducers = combineReducers({
    AppDataReducer: appDataSlice.reducer,
})

export type appReducer = ReturnType<typeof combinedAppReducers>

const allReducers = (state: appReducer, action: AnyAction) => {
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


const makeAppStore = () =>
    configureStore({
        reducer: {
            reducers: allReducers
        },
        devTools: true,
    });

type AppStore = ReturnType<typeof makeAppStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore["getState"]>;
export type HookAppReducerType = TypedUseSelectorHook<AppState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    AppState,
    unknown,
    Action
>;
export const appStoreWrapper = createWrapper<AppStore>(makeAppStore);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: HookAppReducerType = useSelector;

const getReducers = (selector: HookAppReducerType) => (selector((state) => state.reducers as appReducer))
export const getAppData = (selector: HookAppReducerType) => (getReducers(selector).AppDataReducer)
