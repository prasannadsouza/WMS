"use client";

import { useRef } from "react";
import { store } from "@/lib/store/store";
import { appDataSlice } from "@/lib/store/appDataSlice"

function Preloader() {
    const { setCurrentTitle } = appDataSlice.actions
    const loaded = useRef(false);
    if (!loaded.current) {
        store.dispatch(setCurrentTitle("Customer"));
        loaded.current = true;
    }
    return null;
}

export default Preloader;
