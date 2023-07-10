"use client";
import { appStore } from "@/lib/store/store";
import { Provider } from "react-redux";

export function AppProvider({ children }: { children: React.ReactNode }) {
    return (<Provider store={appStore}>{children}</Provider>);
}
